<div align="center">
  <a href="https://eigenfocus.com?utm_source=github-readme&utm_content=banner">
    <img src="https://eigen-assets.eigenfocus.com/github/github-banner-3.png" alt="Eigenfocus"/>
  </a>
  <p>
    Self-hosted Project Management tool - without the clutter.
    <br/>
    Powerful enough for complex projects. Simple enough to actually use.
  </p>
  <a href="#installation"><strong>Docker Installation</strong></a> |
  <a href="https://eigenfocus.com?utm-source=github" target="_blank"><strong>Website</strong></a> |
  <a href="https://pro-demo.eigenfocus.com/?utm_source=eigenfocus-github&utm_medium=header" target="_blank"><strong>PRO - Live demo</strong></a>
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
  <img src="https://img.shields.io/badge/Current_Release-1.5.0--free-blue.svg?style=flat"/>
  <img src="https://img.shields.io/docker/pulls/eigenfocus/eigenfocus.svg"></img>
  <br />
  <br/>
</div>

# Eigenfocus - FREE EDITION

<div align="center">
  <img alt="Eigenfocus" src="https://eigen-assets.eigenfocus.com/github/demo-6.gif" width="85%" style="border-radius: 10px;"/>
</div>
<br/>

- Unlimited projects, boards, and issues
- List and Board views
- Markdown descriptions and file attachments
- Labels, comments, and due dates
- Built-in time tracking with reports
- Focus Space with timers and ambient sounds
- Light and Dark themes

<div align="center">
If you enjoy Eigenfocus, ⭐️ the repo to follow updates.
</div>

<br/>

# When You Need More

Eigenfocus grows with you. Pay once, no subscriptions.

- Multiple users with roles and permissions

- Custom Fields to track project-specific data
- Create multiple views with predefined settings
- Grid View with columns and swimlanes
- Timeline View to plan and visualize work over time
- Custom statuses and issue types
- Project templates
- SSO (Google, Microsoft, GitHub, OIDC)

<div align="center">
<a href="https://eigenfocus.com/features?utm_source=github-readme">See all features</a> | <a href="https://pro-demo.eigenfocus.com/?utm_source=eigenfocus-github&utm_medium=readme">PRO Edition - Live demo</a>
<br/>
Also available as a <a href="https://eigenfocus.com/pricing?utm_source=github-readme">managed Cloud edition</a>.
</div>
<div align="center">
  <br/>
  <p>
    Board, Grid, List and Timeline views. Switch between them in one click.
  </p>

  <a href="https://eigenfocus.com/features?utm_source=github-readme">
    <img width="90%" style="border-radius: 10px;" src="https://eigen-assets.eigenfocus.com/features-v2/multiple-views/multiple-views-jump-raw-cut.gif"/>
  </a>

  <br/>
  <p>
    Custom Fields - Per-project fields, visible right on your cards.
  </p>

  <a href="https://eigenfocus.com/features?utm_source=github-readme">
    <img width="90%" style="border-radius: 10px;" src="https://eigen-assets.eigenfocus.com/features-v2/custom-fields/custom-field-showcase-2.min.gif"/>
  </a>
  <br/>
</div>

------


<br/>

# Installation

> If you know someone who might benefit, spread the word.

## Docker
```sh
docker run \
    --restart unless-stopped \
    -v ./app-data:/eigenfocus-app/app-data \
    -p 3001:3000 \
    -e DEFAULT_HOST_URL=http://localhost:3001 \
    -d \
    eigenfocus/eigenfocus:1.5.0-free
```

And access it at http://localhost:3001.

## Docker Compose
Or using a `docker-compose.yml` file:

```yaml
services:
  web:
    image: eigenfocus/eigenfocus:1.5.0-free
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

# Contact
Feel free to contact us `hi@eigenfocus.com`.

# Other
## Contributions
Thank you for your interest in contributing to Eigenfocus.

You’re welcome to email us with ideas, suggestions or feedback.

Since Eigenfocus includes a paid version, we don’t accept external pull requests. We believe this keeps expectations clear and fair.

## License
Eigenfocus is free to self host and source available under [License](LICENSE).