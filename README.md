<div align="center">
  <h1><b>Eigenfocus</b></h1>
  <p>
    All-in-One Self-Hosted<br/>Project Management, Time Tracking and Focus App
  </p>
  <a href="https://eigenfocus.com"><strong>Website</strong></a> |
  <a href="#installation"><strong>Docker Installation</strong></a> |
  <a href="#live-demo"><strong>Live Demo</strong></a>
</div>
<br />
<div align="center">
  <img src="https://img.shields.io/badge/Made with care-Rails.svg?style=flat&logo=undertale&labelColor=%235E6AD2&color=%235E6AD2"/>
</div>
<br />
<div align="center">
  <img src="https://github.com/Eigenfocus/eigenfocus/actions/workflows/ci.yml/badge.svg"></img>
  <img src="https://img.shields.io/docker/pulls/eigenfocus/eigenfocus.svg"></img>
  <img src="https://img.shields.io/badge/Ruby-Ruby.svg?style=flat&logo=ruby&labelColor=%23CC342D&color=%23333"/>
  <img src="https://img.shields.io/badge/Ruby on Rails-Rails.svg?style=flat&logo=rubyonrails&labelColor=%23CC342D&color=%23333"/>
</div>
<br />

<div align="center">
  <img src="https://img.shields.io/badge/0.9.0-blue.svg?style=flat&label=Stable Release&labelColor=%23333&color=%23427D80"/>
  <br/>
  <br/>
  <a href="https://github.com/Eigenfocus/eigenfocus/releases/tag/v0.9.0"><strong>See what is new in our 0.9.0</strong></a>
</div>


# Our Vision
We're building an All-In-One Self-Hosted solution to manage projects, time, teams and focus.

We've been working with product development for a while so this product is built on the wisdom, pain and scars that we've gathered over the years. Our philosophy is to create a tool that is both simple and versatile: effective for projects of all sizes, from solo projects to multi-member teams.

Any new ideas are welcome.


# FREE EDITION (this repo)

Here are some of our current features:

- Projects: create/edit/update/archive you projects
- Boards: each project has a board where you can customize columns to your workflow
- Issues: create issues, write markdown descriptions and attach files
- Workflow with Boards: Make changes to your boards and see changes in real-time
- Issue Labels and Shortcuts: Organize your issues and workflow with labels
- Time Tracking: track time spent on a Project and a Specific Issue
- Time Report: generate time reports by project and time periods
- Themes: customize the UI to your taste


Here is what is coming next:
- Focus Space

<div align="center">
⭐️ this repository and stay up to date.
</div>


## FREE EDITION - Some Screenshots/Recordings
<div align="center">
<img alt="time-track" src="https://blog-assets.eigenfocus.com/post-080/readme/croped/time-track-black-3.gif" width="75%"/>

<img alt="board" src="https://blog-assets.eigenfocus.com/post-080/readme/croped/board-2.gif" width="75%"/>
<img alt="board" src="https://blog-assets.eigenfocus.com/post-080/readme/croped/all-issues-1.gif" width="75%"/>

<img alt="board" src="https://blog-assets.eigenfocus.com/post-080/readme/croped/themes-1.gif" width="75%"/>
</div>

<br/>

# PRO Edition (another repo)
We're building a PRO Edition (Paid) with advanced features for managing complex projects and larger teams.

Coming in the First Release:

- Multiple Users with Permission Control
- Custom Issue Statuses & Types
- Create Views with Pre-Saved Filters
- Multiple View Types: Boards and Matrices
- Reports & Insights for Smarter Decisions

<div align="center">
  <a href="https://eigenfocus.com?utm_source=github-readme#plans">🔔 <strong>Subscribe to our Waitlist</strong></a>
</div>

## It fits your workflow
Tailor your views using status, people or labels to match how you work.

- Plan Ideas & Initiatives
- Prioritize Work & Features
- Allocate by Quarters or Sprints
- Streamline Daily Workflows
- Track Team Workload
- ...and more!

<br/>

<div align="center">
  <img width="90%" src="https://assets.eigenfocus.com/github-readme/pro-demo-preview/matrix-workflow.png"/>
  <br/>
</div>
<br/>

----

<br/>
<div align="center">
  The best tool is the one that doesn't stay in your way.</p>
</div>

<div align="center">
  <a href="https://eigenfocus.com?utm_source=github-readme#plans">🔔 <strong>Subscribe to our Waitlist</strong></a>
</div>

<br/>

# Live Demo
There's a live demo for the FREE Edition where you can test our features.

In this demo uploads are disabled and all data will expire after 30 minutes.

<div align="center">
<a href="https://demo.eigenfocus.com/" rel="nofollow">👀 <strong>Check the live demo</strong></a>
</div>

<br/>

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
    eigenfocus/eigenfocus:0.9.0
```

And access it at http://localhost:3001.

## Docker Compose
Or using a `docker-compose.yml` file:

```yaml
services:
  web:
    image: eigenfocus/eigenfocus:0.9.0
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

### Optional http basic auth
You can enable HTTP Basic Auth by setting these two env variables:

- `HTTP_AUTH_USER` - For the username
- `HTTP_AUTH_PASSWORD` - For the password

➜ If you're exposing the service to the internet don't forget to setup a certificate and use HTTPS.

# Development Guidelines
Check the [README.md](docs/README.md) file for instructions on how to setup the project.

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
