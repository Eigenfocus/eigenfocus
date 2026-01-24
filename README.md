<div align="center">
  <a href="https://eigenfocus.com?utm_source=github-readme&utm_content=banner">
    <img src="https://eigen-assets.eigenfocus.com/github/eigenfocus-github-banner-2.png" alt="Eigenfocus"/>
  </a>
  <br/>
  <br/>
  <a href="https://eigenfocus.com?utm-source=github" target="_blank"><strong>Website</strong></a> |
  <a href="#installation"><strong>Docker Installation</strong></a> |
  <a href="https://pro-demo.eigenfocus.com/?utm_source=eigenfocus-github&utm_medium=header" target="_blank"><strong>PRO - Live demo</strong></a>
</div>
<br />
<div align="center">

</div>
<br />
<div align="center">
  <img src="https://github.com/Eigenfocus/eigenfocus/actions/workflows/ci.yml/badge.svg"></img>
  <img src="https://img.shields.io/badge/Ruby-Ruby.svg?style=flat&logo=ruby&labelColor=%23CC342D&color=%23333"/>
  <img src="https://img.shields.io/badge/Ruby on Rails-Rails.svg?style=flat&logo=rubyonrails&labelColor=%23CC342D&color=%23333"/>
</div>
<br />

<div align="center">
  <img src="https://img.shields.io/badge/Made with care-Rails.svg?style=flat&logo=undertale&labelColor=%235E6AD2&color=%235E6AD2"/>
  <img src="https://img.shields.io/badge/Current_Release-1.5.0.rc2--free-blue.svg?style=flat"/>
  <img src="https://img.shields.io/docker/pulls/eigenfocus/eigenfocus.svg"></img>
  <br />
  <br/>
</div>

<br />

# Eigenfocus
Eigenfocus is a project management and time tracking tool built for clarity and ownership.

# FREE EDITION
Eigenfocus FREE gives you everything you need to manage small projects with focus and confidence.

<div align="center">
  <img alt="Eigenfocus" src="https://eigen-assets.eigenfocus.com/github/demo-6.gif" width="85%" style="border-radius: 10px;"/>
</div>
<br/>

Here are some of the features included in the FREE edition:

- Create unlimited projects
- Issues with markdown descriptions and file attachments
- Table list to browse all issues
- Kanban board for visual issue management
- Labels to organize work
- Comments for adding notes and context
- Time Tracking on projects and individual issues
- Time Reports by project and date range
- Focus Space with timers and ambient sounds
- Light and Dark themes

<div align="center">
If you enjoy Eigenfocus, ⭐️ the repo to follow updates.
</div>

<br/>

# Upgrade with Pay ONCE
When your projects grow, Eigenfocus grows with you.

Our Pay ONCE plans give you features for teams, more complex projects and workflows.

- Multiple users with per-project permission control
- Grid View with fully customizable columns and rows
- Create multiple Views for different workflows
- Views as projections: group issues by label, assignee, status and switch between views instantly
- Custom Issue Statuses & Types
- Clone projects and use them as templates
- SSO login with Google, Microsoft, and GitHub
- Support for custom OIDC providers (Authentik, Okta, and others)

<br/>

------

<br/>

<div align="center">
  <a href="https://eigenfocus.com/features?utm_content=pro-section&utm_source=github-readme#pro-features"><strong>PRO Edition - Features</strong></a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://pro-demo.eigenfocus.com/?utm_source=eigenfocus-github&utm_medium=header"><strong>Live demo</strong></a>
</div>

<br/>

------


<div align="center">
  <br/>
  <p>
    Views as projections: group issues by label, assignee, status and switch between views instantly.
  </p>

  <a href="https://eigenfocus.com/features?utm_source=github-readme">
    <img width="90%" style="border-radius: 10px;" src="https://eigen-assets.eigenfocus.com/features-v2/views-as-projections.gif"/>
  </a>

  <br/>
  <p>
    Grid View - Use columns and rows to group issues by status, labels, assignees...
  </p>

  <a href="https://eigenfocus.com/features?utm_source=github-readme">
    <img width="90%" style="border-radius: 10px;" src="https://eigen-assets.eigenfocus.com/landing/grid-1.gif"/>
  </a>

  <br/>
  <p>
    Custom Statuses & Types
  </p>
  <img width="40%" style="border-radius: 10px;"  src="https://eigen-assets.eigenfocus.com/all/landing/pro-features/issue-types-2.jpg"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="40%" style="border-radius: 10px;"  src="https://eigen-assets.eigenfocus.com/all/landing/pro-features/views-1.jpg"/>
  <br/>


</div>

<br/>


------

<br/>

<div align="center">
  <a href="https://eigenfocus.com/features?utm_source=github-readme"><strong>PRO Edition - Features</strong></a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://pro-demo.eigenfocus.com/?utm_source=eigenfocus-github&utm_medium=header"><strong>Live demo</strong></a>
</div>

<br/>

------


<br/>

# Installation

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

You can run our project using our docker image directly with docker or docker compose:

## Docker
```sh
docker run \
    --restart unless-stopped \
    -v ./app-data:/eigenfocus-app/app-data \
    -p 3001:3000 \
    -e DEFAULT_HOST_URL=http://localhost:3001 \
    -d \
    eigenfocus/eigenfocus:1.5.0.rc2-free
```

And access it at http://localhost:3001.

## Docker Compose
Or using a `docker-compose.yml` file:

```yaml
services:
  web:
    image: eigenfocus/eigenfocus:1.5.0.rc2-free
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

- `DEFAULT_HOST_URL`: URL used to access Eigenfocus
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
Thank you for your interest in contributing to Eigenfocus.

You’re welcome to open issues with ideas, suggestions or feedback.

Since Eigenfocus includes a paid version, we don’t accept external pull requests. We believe this keeps expectations clear and fair.

## License
Eigenfocus is free to self host, but not open source. See the [License](LICENSE) for more details.
