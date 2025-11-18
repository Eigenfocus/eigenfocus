ARG RUBY_VERSION=3.4.7
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim AS base

# Eigenfocus App
WORKDIR /eigenfocus-app

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_JOBS="4" \
    BUNDLE_WITHOUT="development" \
    SOLID_QUEUE_IN_PUMA="1"

# Throw-away build stage to reduce size of final image
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libvips pkg-config gnupg2 curl

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y nodejs

RUN npm install -g yarn

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# Install node dependencies
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

# Copy application code
COPY . .

# Precompiling assets for production without requiring secrets
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile && \
    rm -rf node_modules

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libsqlite3-0 libvips && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built artifacts: gems, application
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /eigenfocus-app /eigenfocus-app

# Copy app files
RUN cp config/database.example.yml config/database.yml

EXPOSE 3000

ENTRYPOINT ["bin/docker-entrypoint"]

CMD ["bin/boot"]
