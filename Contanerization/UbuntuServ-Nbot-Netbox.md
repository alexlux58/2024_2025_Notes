root@ubuntuserver:~# docker ps
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
144c015c3b13 yourrepo/nautobot-docker-compose:local "sh -c 'nautobot-ser…" 28 hours ago Up 28 hours (healthy) 8080/tcp, 8443/tcp nautobot-docker-compose-celery_worker-1
5cb4b42dea12 yourrepo/nautobot-docker-compose:local "sh -c 'nautobot-ser…" 28 hours ago Up 28 hours 8080/tcp, 8443/tcp nautobot-docker-compose-celery_beat-1
299aa49e7df5 yourrepo/nautobot-docker-compose:local "/docker-entrypoint.…" 28 hours ago Up 28 hours (healthy) 0.0.0.0:8080->8080/tcp, :::8080->8080/tcp, 8443/tcp nautobot-docker-compose-nautobot-1
9f0ae5d245f8 redis:6-alpine "docker-entrypoint.s…" 28 hours ago Up 28 hours 6379/tcp nautobot-docker-compose-redis-1
70bdf4eb871d postgres:13-alpine "docker-entrypoint.s…" 28 hours ago Up 28 hours (healthy) 5432/tcp nautobot-docker-compose-db-1
46e0cb1d4a37 netboxcommunity/netbox:v4.1-3.0.2 "/usr/bin/tini -- /o…" 33 hours ago Up 33 hours (healthy) netbox-docker-netbox-worker-1
34862758e18d netboxcommunity/netbox:v4.1-3.0.2 "/usr/bin/tini -- /o…" 33 hours ago Up 33 hours (healthy) netbox-docker-netbox-housekeeping-1
da4e62500058 netboxcommunity/netbox:v4.1-3.0.2 "/usr/bin/tini -- /o…" 33 hours ago Up 33 hours (healthy) 0.0.0.0:8000->8080/tcp, [::]:8000->8080/tcp netbox-docker-netbox-1
ab6fe6d7f89f valkey/valkey:8.0-alpine "docker-entrypoint.s…" 33 hours ago Up 33 hours (healthy) 6379/tcp netbox-docker-redis-1
e07667a4fd78 postgres:16-alpine "docker-entrypoint.s…" 33 hours ago Up 33 hours (healthy) 5432/tcp netbox-docker-postgres-1
f2a49dcaa1ce valkey/valkey:8.0-alpine "docker-entrypoint.s…" 33 hours ago Up 33 hours (healthy) 6379/tcp netbox-docker-redis-cache-1

root@ubuntuserver:~# docker images
REPOSITORY TAG IMAGE ID CREATED SIZE
yourrepo/nautobot-docker-compose local 78964ebe28ab 28 hours ago 1.15GB
netboxcommunity/netbox v4.1-3.0.2 059b8cb7443d 4 days ago 669MB
redis 6-alpine ec1b0a84ddf9 2 weeks ago 30MB
valkey/valkey 8.0-alpine 1c3d10420c26 2 weeks ago 39MB
postgres 16-alpine 8c93ef988991 2 months ago 245MB
postgres 13-alpine ed06eaccad7e 2 months ago 238MB
hello-world latest d2c94e258dcb 17 months ago 13.3kB
root@ubuntuserver:~#

1. Declarative “bring-up” via your Compose files
   Since all of your container definitions live in Git under netbox-docker/ and nautobot/nautobot-docker-compose/, you never need to manually rebuild or re-tag images on the host. Just re-pull from your registry and start them:

# Rehydrate Nautobot

cd ~/nautobot/nautobot-docker-compose
docker compose pull # grab yourrepo/nautobot-docker-compose:local
docker compose \
 -f environments/docker-compose.base.yml \
 -f environments/docker-compose.postgres.yml \
 -f environments/docker-compose.local.yml \
 up -d # recreate all Nautobot services

# Rehydrate NetBox

cd ~/netbox-docker
docker compose pull # grab netboxcommunity/netbox:v4.1-3.0.2, etc.
docker compose up -d # recreate NetBox stack
Because your Compose files declare the exact images (and volumes) to use, this always reproduces the same topology.

2. Bake “on-boot” automation into the VM
   To avoid typing those commands by hand, wrap them in a little shell script and a systemd service so they run on every boot:

Create /usr/local/bin/start-all-nb.sh:

#!/usr/bin/env bash
set -e

cd /home/ubuntu/nautobot/nautobot-docker-compose
docker compose pull
docker compose \
 -f environments/docker-compose.base.yml \
 -f environments/docker-compose.postgres.yml \
 -f environments/docker-compose.local.yml \
 up -d

cd /home/ubuntu/netbox-docker
docker compose pull
docker compose up -d

chmod +x /usr/local/bin/start-all-nb.sh
Create systemd unit /etc/systemd/system/nb-stack.service:

[Unit]
Description=Start NetBox & Nautobot
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/start-all-nb.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
Enable it:

systemctl daemon-reload
systemctl enable nb-stack.service
Now, on every reboot your VM will pull any missing images and spin up both stacks automatically.

Bonus: Ensure your images are always available
Push to your registry. After you build locally, do

docker tag local-image:latest yourrepo/nautobot-docker-compose:local
docker push yourrepo/nautobot-docker-compose:local
so that even if the VM’s /var/lib/docker is wiped, your registry holds the image.

Use restart: unless-stopped in your Compose services so Docker itself will bring containers up if the daemon restarts.
