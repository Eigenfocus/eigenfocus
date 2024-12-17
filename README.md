# README

## Development Environment Setup

## Copy a few example files because the real files are git ignored

```sh
cp example.env .env
cp config/database.example.yml config/database.yml
cp docker-compose.override.dev.example.yml docker-compose.override.yml
```

## Build everything using docker

*The first time you run this it's going to take 5-10 minutes depending on your
internet connection speed and computer's hardware specs. That's because it's
going to download a few Docker images and build the Ruby image

```sh
docker compose build
```

## Run the containers:

```sh
docker compose up
```

## Setup the initial database:

Now that everything is built and running we can treat it like any other Rails
app.

```sh
# You can run this from a 2nd terminal.
docker compose run web bin/rails db:create db:migrate
```


## Running the Rails console
When the app is already running with `docker compose` up, attach to the container:
```
docker compose exec web bin/rails c
```

## Running tests

```
docker compose run -e "RAILS_ENV=test" --rm web bundle exec rspec
```

view tests running on http://127.0.0.1:7900