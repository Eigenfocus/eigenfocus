<div align="center">
  <a href="https://eigenfocus.com?utm_source=github-readme&utm_content=banner"><img src="https://raw.githubusercontent.com/Eigenfocus/focus-assets/refs/heads/main/images/eigenfocus-github-banner.png" alt="Eigenfocus"/></a>
  <br/>
  <br/>
  <a href="https://eigenfocus.com?utm-source=github&utm_medium=try-cloud"><strong>Website</strong></a> |
  <a href="#installation"><strong>Docker Installation</strong></a>
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
  <img src="https://assets.eigenfocus.com/current-release-100.svg"/>
  <br />
  <br/>
  <a href="http://eigenfocus.com/features?utm_content=header&utm_source=github-readme#pro-features"><strong>We also have a PRO Edition 👀</strong></a>
</div>

<br />

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
- Focus Space where you can setup
- Themes: customize the UI to your taste

<div align="center">
⭐️ this repository and stay up to date.
</div>

Comming next:
- Better navigation between projects
- Running time tracking alerts
- Shortcuts & Quick Actions
- Focus target (you'll understand when you see it 👀)
- A more colorful labels experience (i.e colored labels)
- \*i\*\*\*y (it's a surprise 🤫)

## FREE EDITION - Some Screenshots/Recordings
<div align="center">
<img alt="time-track" src="https://blog-assets.eigenfocus.com/post-080/readme/croped/time-track-black-3.gif" width="75%"/>
<img alt="board" src="https://blog-assets.eigenfocus.com/post-080/readme/croped/board-2.gif" width="75%"/>
<img alt="issue list" src="https://blog-assets.eigenfocus.com/post-080/readme/croped/all-issues-1.gif" width="75%"/>
<img alt="focus-timers" src="https://blog-assets.eigenfocus.com/demo-v1/focus-space-min.gif" width="75%"/>
</div>

<br/>

# PRO Edition (another repo)
We have a PRO Edition (Paid) with advanced features for managing complex projects and larger teams.

Here are some of the features:

- Multiple Users with Permission Control
- Custom Issue Statuses & Types
- Multiple views with pre-saved filters
- Eigencolumns aren't just "Trello lists" -> they are true projections from your issues and can represent many things: a status, a label, a person...
- Grid View (Coming Soon)

<br/>

------

<br/>

<div align="center">
  <a href="http://eigenfocus.com/features?utm_content=pro-section&utm_source=github-readme#pro-features"><strong>👉 Early Access to PRO Edition is rolling out.</strong></a>
</div>

<br/>

------

<br/>

<div align="center">
  <p>
    Eigencolumns: by release labels
  </p>
  <img width="90%" src="https://assets.eigenfocus.com/dynamic-columns/by-release.jpg"/>
  <br/>
  <br/>
  <p>
    Grid View (comming soon)
  </p>
  <img width="90%" src="https://assets.eigenfocus.com/github-readme/pro-demo-preview/matrix-workflow.png"/>
  <br/>
</div>

<br/>

<div align="center">
  <a href="http://eigenfocus.com/features?utm_content=pro-section&utm_source=github-readme#pro-features"><strong>👉 See all PRO Edition features</strong></a>
</div>

<br/>


> Hey 👋,
>
> This FREE Edition exists thanks our PRO Edition cloud and self-hosted users
>
> If you know someone who might benefit from Eigenfocus,
>
> *spread the word* and help us grow! 💪
>
> Thanks!

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
    eigenfocus/eigenfocus:1.0.0-free
```

And access it at http://localhost:3001.

## Docker Compose
Or using a `docker-compose.yml` file:

```yaml
services:
  web:
    image: eigenfocus/eigenfocus:1.0.0-free
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
Feel free to contact us `hi@eigenfocus.com` or open an issue.

# Other
## Contributions
Thank you for your interest in contributing to the project.

Feel free to open an issue with any idea, suggestion or comment.

As we offer a paid version of Eigenfocus, we don't think it's fair to accept code contributions from other people so we're not accepting pull requests.

## License
We're a free self-hosted project that you can use but we're not open source. Check our [License](LICENSE).
