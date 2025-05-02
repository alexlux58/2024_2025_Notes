# Prometheus

- An open-source systems monitoring and alerting toolkit with an active ecosystem.
- It's a tool that allows you to analyze how your applications and infrastructure are performing from the metrics discovered by it.
- Prometheus components are written in Go.
- Uses a 'multi-dimensional' data model with 'time series data' identified by 'metric name' and 'key/value pairs'.

ex: http_requests_total {method="get"}
metric name: http_requests_total
key/value pairs: method="get"

**Out of the box features:**

- Uses a very simple query language 'PromQL'.
  - PromQL is a 'read-only' and a flexible query language, that allows aggregation across any of the labels stored in its time series.
  - No reliance on distributed storage; single server nodes are autonomous.
  - Default libraries and servers available for Prometheus - Windows, Linux machines, MySQL, etc.
  - To monitor custom services, you can add instrumentation to your code, via Prometheus client libraries like Go, Java or Scala, Python, Ruby, and many more...
  - Full-fledged monitoring system with its own Alert manager.

# Monitoring tools should provide

- Collet or at least listen for events, typically with a timestamp
- Effectively store those events in storage
- Should support querying feature
- Provide a graphical monitoring

# Prometheus Alternatives

- Nagios
- Zabbix
- sensu
- graphite
- influxDB
- OpenTSDB
- Datadog
- NewRelic

# Prometheus vs Graphite

- Graphite is merely a storage and graphing framework. It is simpler 'data logging' and 'graphing' tool for time series data.
- Graphite precisely does two things:
  - Store numeric time series data.
  - Render graphs of this data.
- Graphite does not have direct data collection capabilities, a separate component called Carbon (Twisted daemon) passively listens for time series data.
- Prometheus is a 'full-fledged' comprehensive monitoring system.
- It is more feature-rich than any other tool.
  - Provides flexible query language.
  - Push gateway for collecting metrics from short lived batch jobs.
  - Wide range of exporters
  - 3rd party tools

**Data Model**

- In Graphite, metric names consist of 'dot-separated' components which implicitly encode dimensions.
- Prometheus encodes dimensions explicitly as 'key-value' pairs, called labels, attached to a metric name. This labelling allows easy filtering, grouping, and matching via the query language.
- Graphite
  - stats.api-server.tracks.post.500 -> 93
- Prometheus
  api_server_http_requests_total{method="POST",handler="/tracks",status="500",instance="<sample1>"}->34
  api_server_http_requests_total{method="POST",handler="/tracks",status="500",instance="<sample2>"}->23
  api_server_http_requests_total{method="POST",handler="/tracks",status="500",instance="<sample3>"}->12

**Storage**

- Graphite expects samples to arrive at regular interval. Every time series is stored in a separate file with new samples overwrite old ones after a certain amount of time.
- Prometheus allows storing samples at arbitrary intervals as scrapes or rule evaluations occur. New samples are simply appended.

# Prometheus Terminology

- Alertmanager
  - Take in alerts from Prometheus server, aggregates them into groups, de-duplicates, applies silences, throttles, and then sends out notifications to email, PagerDuty, Slack, etc.
- Target
  - The definition of an object to scrape. Target is an object whose metrics are to be monitored.
- Instance
  - In Prometheus terms, an endpoint you can scrape is called an instance.
  - ex: 192.168.4.150:5760
- Job
  - a collection of targets/instances with the same purpose.
- Sample
  - A single value at a point in time in a time series.
  - ex: http_requests_total{method="get"} 1027

# Architecture

- Prometheus server
  - The core component of the Prometheus monitoring system.
  - It is a time series database that stores all the metrics data.
  - It scrapes and stores time series data.
  - It has a built-in alert manager.
- Exporters
  - Exporters are components that expose metrics to Prometheus.
  - They can be used to monitor existing systems and services.
  - They can be used to monitor custom applications.
  - They can be used to monitor hardware.
- Push gateway
  - Push gateway is a component that allows you to push metrics to Prometheus.
  - It is used to monitor short-lived batch jobs.
  - It is used to monitor custom applications.
- Alert manager
  - Alert manager is a component that manages alerts.
  - It is used to send notifications to external systems.
  - It is used to manage silences and inhibition rules.
- Grafana
  - Grafana is a visualization tool that can be used to visualize metrics from Prometheus.
  - It is used to create dashboards and graphs.
  - It is used to create alerts and notifications.
- Service discovery
  - Service discovery is a component that allows you to discover targets automatically.
  - It is used to discover targets in cloud environments.
  - It is used to discover targets in containerized environments.
- Remote storage
  - Remote storage is a component that allows you to store metrics in external systems.
  - It is used to store metrics in long-term storage systems.
  - It is used to store metrics in external databases.
- Web UI
  - Web UI is a component that allows you to visualize metrics in a web browser.
  - It is used to create dashboards and graphs.
  - It is used to create alerts and notifications.
- Alerting
  - Alerting is a component that allows you to create alerts based on metrics.
  - It is used to create alerts based on thresholds.
  - It is used to create alerts based on trends.
- Querying
  - Querying is a component that allows you to query metrics.
  - It is used to create queries based on metrics.
  - It is used to create queries based on labels.
- Visualization
  - Visualization is a component that allows you to visualize metrics.
  - It is used to create dashboards and graphs.
  - It is used to create alerts and notifications.
- API
  - API is a component that allows you to interact with Prometheus.
  - It is used to create queries based on metrics.
  - It is used to create queries based on labels.
- Client libraries
  - Client libraries are libraries that allow you to instrument your code.
  - They are used to expose metrics to Prometheus.
  - They are used to create custom metrics.
