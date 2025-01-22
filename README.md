<div align="center">
  <h1><b>Eigenfocus</b></h1>
  <p>
      Self-Hosted All-in-One Project Management App: Boards, Time Tracking & Focus Tools.
  </p>
  <a href="https://eigenfocus.com"><strong>Website</strong></a> |
  <a href="#installation"><strong>Docker Installation</strong></a>
</div>
<br />
<div align="center">
  <img src="https://img.shields.io/badge/Made with care-Rails.svg?style=flat&logo=undertale&labelColor=%235E6AD2&color=%235E6AD2"/>
</div>
<br />
<div align="center">
  <img src="https://github.com/Eigenfocus/eigenfocus/actions/workflows/ci.yml/badge.svg"></img>
  <img src="https://img.shields.io/badge/Ruby-Ruby.svg?style=flat&logo=ruby&labelColor=%23CC342D&color=%23333"/>
  <img src="https://img.shields.io/badge/Ruby on Rails-Rails.svg?style=flat&logo=rubyonrails&labelColor=%23CC342D&color=%23333"/>
</div>
<br />

<div align="center">
  <img src="https://img.shields.io/badge/0.7.0-blue.svg?style=flat&label=Stable Release&labelColor=%23333&color=%23427D80"/>
</div>


# Our Vision
We're building an All-In-One Self-Hosted solution to manage projects, time and teams.

We've been working with product development for more than a decade so this product is built on the wisdom, pain and scars that we've gathered over the years. Our philosophy is to create a tool that is both simple and versatile: effective for projects of all sizes, from solo projects to multi-member teams.

Any new ideas are welcome.

# FREE EDITION (this repo)
## FREE EDITION - Features
Here are some of our current features:

- Projects: create/edit/update/archive you projects
- Boards: each project has a board where you can customize columns to your workflow
- Issues: create issues, write markdown descriptions and attach files
- Workflow with Boards: Move issues between columns
- Time Tracking: track time spent on a Project and a Specific Issue
- Time Report: generate time reports by project and time periods
- Themes: customize the UI to your taste

## FREE EDITION - Roadmap

Here is what is coming next:
- Seamless Integration between Boards <> Time Tracking
- Managing Logged Time Inside a Issue
- UX enhancements for handling multiple cards/issues at once in a board
- View Issues as List
- Long running time tracking alerts
- Timers and time alerts to improve focus (Pomodoro, drinking water, stretching)
- Focus playlist sounds/songs

<div align="center">
⭐️ this repository and stay up to date.
</div>

<br/>

# Supporter Edition (another repo)
## Supporter Edition - Roadmap
We're building a Supporter Edition (Paid) with features for managing more complex projects and teams.

- Inviting members
- User/Project Permissions
- More types of views (boards, lists, custom matrices, timeline)
- Multiple views per project
- Issue Tagging
- More types of reports

<div align="center">
<a href="https://eigenfocus.com/#plans">🔔 <strong>Subscribe to our Waitlist</strong></a>
</div>

<br/>

# FREE EDITION - Some Screenshots
<div align="center">
<img alt="time-track" src="https://github.com/user-attachments/assets/5cc6c4f9-2475-4586-a257-cfdc934a6fc4" width="75%"/>
<img alt="board" src="https://github.com/user-attachments/assets/2e08e73e-3f1e-451d-a1f6-907e6a1280a0" width="75%"/>
<img alt="reports" src="https://github.com/user-attachments/assets/d0ce92c5-613c-462e-87ea-184a0b487ab5" width="75%"/>

<img alt="noir-time" src="https://github.com/user-attachments/assets/ed06ee87-3a74-45cb-a3f8-31324f4d9b17" width="75%"/>
<img alt="noir-board" src="https://github.com/user-attachments/assets/536feec1-8ebc-4914-91df-c0b53d3b9c1e" width="75%"/>
</div>

# Installation
You can run our project using our docker image directly with docker or docker compose:

## Docker
```sh
docker run \
    --restart unless-stopped \
    -v ./app-data:/eigenfocus-app/app-data \
    -p 3001:3000 \
    -e DEFAULT_HOST_URL=http://localhost:3001 \
    -d \
    eigenfocus/eigenfocus:0.7.0
```

And access it at http://localhost:3001.

## Docker Compose
Or using a `docker-compose.yml` file:

```yaml
services:
  web:
    image: eigenfocus/eigenfocus:0.7.0
    restart: unless-stopped
    volumes:
      - ./app-data:/eigenfocus-app/app-data
    environment:
     - DEFAULT_HOST_URL=http://localhost:3001
    ports:
      - 3001:3000
```

Then, run it with the CLI:

```sh
docker compose up -d
```

And access it at http://localhost:3001.

## Environment Configurations

- `DEFAULT_HOST_URL`: URL that is going to be used to access your application.
  - Example: "http://localhost:3001", "http://mydomain.com" or "https://mydomain.com"
- `FORCE_SSL`: Defaults to `false`. If set to `true`, all incoming requests that are not HTTPS will be redirected to use HTTPS protocol.
- `ASSUME_SSL_REVERSE_PROXY`: Defaults to `false`. If set to `true`, all incoming requests will be interpreted as HTTPS. This is useful for cases when you have `FORCE_SSL` set to `true` but are behind a reverse proxy that terminates the SSL. This means that our app will be receiving requests via HTTP. In order to avoid an infinite redirect loop to HTTPS you must set `ASSUME_SSL_REVERSE_PROXY` to `true`. For more information, check the conversation and changelog on https://github.com/rails/rails/pull/47139.

# Development Guide
Alternatively, if you need to fine tune a config [Check the Development Guide](docs/DEVELOPMENT.md).

# Contact
We are in *beta* and any feedbacks are welcome.

Feel free to contact us `hi@eigenfocus.com` or open an issue.

# Other
## Contributions
Thank you for your interest in contributing to the project.

Feel free to open an issue with any idea, suggestion or comment.

As we offer a paid version of Eigenfocus, we don't think it's fair to accept code contributions from other people so we're not accepting pull requests.

## License
We're a free self-hosted project that you can use but we're not open source. Check our [License](LICENSE).
