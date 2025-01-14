<div align="center">
    <h1><b>Eigenfocus</b></h1>
    <p>
        Free Self-Hosted All-in-One Management App: Kanban Boards, Time Tracking & Focus Tools.
    </p>
    <p>Manage your personal and work projects in one place.</p>
    <br />
    <a href="https://eigenfocus.com"><strong>Website</strong></a> |
    <a href="#installation"><strong>Installation</strong></a>
</div>
<br />

# Our Features
Here are some of our current features:

- Projects: create/edit/update/archive you projects
- Boards: each project has a board where you can customize columns to your workflow
- Issues: create issues using the project board
- Workflow with Boards: Move issues between columns
- Time Tracking: track time spent on a Project and a Specific Issue
- Time Report: generate time reports by project and time periods
- Themes: customize the UI to your taste

# Some Screenshots
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
    eigenfocus/eigenfocus:0.6.0
```

And access it at http://localhost:3001.

## Docker Compose
Or using a `docker-compose.yml` file:

```yaml
services:
  web:
    image: eigenfocus/eigenfocus:0.6.0
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
[License](LICENSE)
