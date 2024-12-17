#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /usr/src/app/tmp/pids/server.pid

echo "bundle install..."
bundle check || bundle install --jobs 4

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
