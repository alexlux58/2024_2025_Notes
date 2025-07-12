1.  Prepare Your Environment
    bash
    Copy
    Edit
    sudo apt update && sudo apt upgrade -y
    curl -fsSL https://get.docker.com | bash
    sudo usermod -aG docker $USER
    sudo apt install -y docker-compose-plugin snmp snmp-mibs-downloader
    Ensure SNMP MIBs are in place:

bash
Copy
Edit
sudo download-mibs
export MIBDIRS=/usr/share/snmp/mibs
📁 2. Create Project Structure
bash
Copy
Edit
mkdir -p ~/monitor-stack/{grafana,data/{elasticsearch,prometheus},conf/{logstash,prometheus}}
cd ~/monitor-stack
🐳 3. docker-compose.yml
Create this in ~/monitor-stack/docker-compose.yml:

yaml
Copy
Edit
version: '3.8'
services:
elasticsearch:
image: docker.elastic.co/elasticsearch/elasticsearch:7.17.18
environment: - discovery.type=single-node - xpack.security.enabled=false
volumes: - ./data/elasticsearch:/usr/share/elasticsearch/data
ports: - "9200:9200"
restart: unless-stopped

logstash:
image: docker.elastic.co/logstash/logstash:7.17.18
volumes: - ./conf/logstash:/usr/share/logstash/pipeline
ports: - "12201:12201/udp" # for GELF log ingest - "5000:5000/tcp"
depends_on: - elasticsearch
restart: unless-stopped

kibana:
image: docker.elastic.co/kibana/kibana:7.17.18
ports: - "5601:5601"
environment: - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
depends_on: - elasticsearch
restart: unless-stopped

prometheus:
image: prom/prometheus:latest
volumes: - ./conf/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro - ./data/prometheus:/prometheus
ports: - "9090:9090"
restart: unless-stopped

grafana:
image: grafana/grafana-oss:latest
ports: - "3000:3000"
volumes: - ./grafana:/var/lib/grafana
environment: - GF_SECURITY_ADMIN_PASSWORD=admin
depends_on: - prometheus
restart: unless-stopped

snmp-exporter:
image: prom/snmp-exporter:latest
volumes: - ./snmp.yml:/etc/snmp_exporter/snmp.yml:ro
ports: - "9116:9116"
restart: unless-stopped

pve-exporter:
image: prompve/prometheus-pve-exporter:latest
volumes: - ./pve.yml:/etc/prometheus/pve.yml:ro
ports: - "9221:9221"
restart: unless-stopped

node-exporter:
image: prom/node-exporter:latest
network_mode: host
pid: host
volumes: - /proc:/host/proc:ro - /sys:/host/sys:ro - /:/rootfs:ro
command: >
--path.procfs=/host/proc
--path.sysfs=/host/sys
--collector.filesystem.ignored-mount-points="^/(sys|proc|dev|host)($|/)"
restart: unless-stopped

cadvisor:
image: gcr.io/cadvisor/cadvisor:latest
privileged: true
volumes: - /:/rootfs:ro - /var/run:/var/run:ro - /sys:/sys:ro - /var/lib/docker/:/var/lib/docker:ro
ports: - "8080:8080"
restart: unless-stopped
⚙ 4. Configuration Files
conf/logstash/logstash.conf
logstash
Copy
Edit
input {
gelf { port => 12201 }
tcp { port => 5000 codec => json }
}
output {
elasticsearch { hosts => ["elasticsearch:9200"] }
stdout { codec => rubydebug }
}
conf/prometheus/prometheus.yml
yaml
Copy
Edit
global:
scrape_interval: 15s

scrape_configs:

- job_name: prometheus
  static_configs:
  - targets: ['localhost:9090']
- job_name: node-exporter
  static_configs:
  - targets: ['localhost:9100']
- job_name: cadvisor
  static_configs:
  - targets: ['localhost:8080']
- job_name: pve
  metrics_path: /metrics
  static_configs:
  - targets: ['pve-exporter:9221']
- job_name: snmp
  params:
  module: [synology]
  static_configs: - targets: ['192.168.4.205']
  metrics_path: /snmp
  relabel_configs: - source_labels: [__address__]
  target_label: **param_target - source_labels: [**param_target]
  target_label: instance - target_label: **address**
  replacement: snmp-exporter:9116
  pve.yml
  yaml
  Copy
  Edit
  default:
  user: prometheus@pam
  token_name: YOURTOKENID
  token_value: YOURTOKENVALUE
  verify_ssl: false
  snmp.yml
  Use the Prometheus SNMP Exporter generator to target Synology OIDs and MIBs.

🚀 5. Deploy the Stack
bash
Copy
Edit
docker compose up -d
✅ 6. Post-Deployment
Access:

Kibana → http://<vm-ip>:5601

Grafana → http://<vm-ip>:3000 (login: admin/admin)

Prometheus → http://<vm-ip>:9090/targets (verify all 6 jobs)

Import dashboards:

Node Exporter Full (ID: 1860)

cAdvisor Dashboard

Proxmox via Prometheus (ID: 10347)
theawesomegarage.com
+5
synoforum.com
+5
youtube.com
+5
blog.devops.dev
grafana.com

Synology NAS (SNMP) dashboard
mariushosting.com
+2
community.veeam.com
+2
synoforum.com
+2

To ship container logs to Logstash via GELF:
Add to each service in Compose YAML:

yaml
Copy
Edit
logging:
driver: gelf
options:
gelf-address: "udp://localhost:12201"
tag: "{{.Name}}"
🔄 7. Auto-Restart & Maintenance
All services use restart: unless-stopped; Docker starts them automatically on boot.

For firmware or app changes, update images and run:

bash
Copy
Edit
docker compose pull
docker compose up -d
Check logs and health:

bash
Copy
Edit
docker logs <container-name>

# Grafana

curl -v http://127.0.0.1:3000 || echo "Grafana local failed"

# Prometheus

curl -v http://127.0.0.1:9090/metrics | head -n 5 || echo "Prometheus failed"

# cAdvisor

curl -v http://127.0.0.1:8080/metrics | head -n 5 || echo "cAdvisor failed"

# Proxmox Exporter

curl -v http://127.0.0.1:9221/metrics | head -n 5 || echo "Proxmox-exporter failed"

# SNMP Exporter (assuming it's running)

curl -v http://127.0.0.1:9116/snmp?target=192.168.4.205&module=synology | head -n 5 || echo "SNMP exporter failed"

sudo ss -tlnp | grep -E '3000|9090|8080|9221|9116'
