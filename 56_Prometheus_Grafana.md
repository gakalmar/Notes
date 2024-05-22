# PROMETHEUS, GRAFANA
- Tool for your Kubernetes cluster to keep track of its health and performance.

# WORKBOOK:
- **Prometheus:**
    - It's a NoSQL database essentially (not really, because it connects metrics, not data)
        - kvp data, where key is a timestamp (it's primarily a key-value databse)
        - it's a time-series type database
    - Pull-push type database as well:
        - You can push data into the DB
        - It can also make pull requests, so it pulls data that it needs (we can also add a frequency)
- **Grafana:**
    - Data-visualization / dashboarding software
    - It can use multiple data-sources:
        - We can give Prometheus data to it
    - Grafana Query Language - we can use this to configure what to be used on a dashboard
        - most of these dashboards are already pre-set, so we can reuse these instead of creating out own
    
# GUIDES:
- **Install & setup using `kubectl`:**
    0. Set up cluster (and VPC unless it's the default)

    1. Create a namespace:
        - create a project folder
        - `kubectl create namespace monitoring`

    2. Create deployments:
        - Prometheus:
            - Deploy Prometheus: `deployment-prometheus.yaml` file
                - Apply: `kubectl apply -f deployment-prometheus.yaml`
            - Expose it as service: `service-prometheus.yaml` file
                - Apply: `kubectl apply -f service-prometheus.yaml`
        - Grafana:
            - Deploy Grafana: `deployment-grafana.yaml` file
                - Apply: `kubectl apply -f deployment-grafana.yaml`
            - Expose it as service: `service-grafana.yaml` file
                - Apply: `kubectl apply -f service-grafana.yaml`

        - Get worker node address:
            - `kubectl get nodes -o wide`

        - Add inbound rules to SGs related to nodes:
            - Allow inbound traffic for TCP on range 30000-30001 from anywhere (2 SGs in each node!)

        - You should now be able to access:
            - `Prometheus` at `http://<your-node-internal-ip>:30000`
            - `Grafana` at `http://<your-node-internal-ip>:30001`
    
    3. Store Grafana passwords in a Kubernetes `Secret`
        - Create a `Secret`:
            - `kubectl create secret generic grafana-secret --from-literal=password='PlanetPlus+104_GA' -n monitoring`
        - Modify the Grafana `Deployment`:
            - use the `deployment-grafana-with-secret.yaml` file
            - Apply: `kubectl apply -f deployment-grafana.yaml` (update the original `yaml` file! just use the contents from the `with-secret` file)
            - Verify: `kubectl get secret grafana-secret -n monitoring -o yaml` (the CLI will tell you there was nothing to update!)

    4. Set up Probes (`livenessProbe`, `readinessProbe`):
        - These probes help Kubernetes know when a container is ready to start accepting traffic (readiness probe) and when a container needs to be restarted (liveness probe).
        - Configure Probes in the `Deployments`:
            - update `deployment-grafana.yaml` and `deployment-prometheus.yaml` files (use contents of `deployment-grafana-with-secret-and-probes` and `deployment-prometheus-with-probes.yaml` files)
            - Apply both:
                - `kubectl apply -f deployment-prometheus.yaml`
                - `kubectl apply -f deployment-grafana.yaml`
            - Verify:
                - `kubectl describe pod -l app=prometheus -n monitoring`
                - `kubectl describe pod -l app=grafana -n monitoring`

    5. Use `configMap`:
        - Creating the `ConfigMap` via Command Line:
            - `kubectl create configmap grafana-config --from-literal=username='admin' --from-literal=password='PlanetPlus+104_GA' -n monitoring`
        - Update Grafana Deployment YAML:
            - update `deployment-grafana.yaml` with the contents of `deployment-grafana-with-configmap-and-probes`
            - Apply: `kubectl apply -f deployment-grafana.yaml`
            - Verify: `kubectl exec -it $(kubectl get pod -l app=grafana -n monitoring -o jsonpath="{.items[0].metadata.name}") -n monitoring -- env`

- **How to use them:**
    - **Prometheus:**
        - Prometheus is a powerful monitoring and alerting tool that collects and stores its metrics as time-series data. Prometheus collects metrics from monitored targets by scraping metrics HTTP endpoints on these targets. Here's how to start using it:

        1. **Explore the Web UI:** Access the Prometheus web interface using the IP and port you configured (e.g., `http://<node-ip>:30000`). Here you can execute queries to see the data Prometheus is collecting.
        
        2. **Writing PromQL Queries:** Use Prometheus's query language, PromQL, to explore your data. For example, you can check the rate of HTTP requests over the past 5 minutes across your monitored applications.
        
        3. **Setting Alerts:** Configure alert rules in Prometheus to receive notifications if certain conditions are met (like high error rates or system resource usage).
    
    - **Grafana:**
        - Grafana provides a visual interface for exploring, analyzing, and monitoring metrics from a variety of sources, including Prometheus. Here’s how to leverage Grafana:

        1. **Access Grafana:** Open Grafana through the IP and port you configured (e.g., `http://<node-ip>:30001`). The default login is usually admin for both the username and password unless changed.
        
        2. **Add Prometheus as a Data Source:** Go to Configuration > Data Sources > Add data source. Select Prometheus and configure it using the URL you use to access Prometheus (e.g., `http://<prometheus-service>:9090`).
        
        3. **Create Dashboards:** Start creating dashboards to visualize metrics. Grafana offers a variety of visualization options like graphs, gauges, and tables. You can import pre-made dashboards or create your own.
        
        3. **Set Up Alerts:** Grafana can also handle alerting. Set up alerts based on thresholds and receive notifications via email, Slack, or other methods.

# LINKS:
- Full install guide: https://geekflare.com/prometheus-grafana-setup-for-linux/
- Prometheus: https://prometheus.io/
- Grafana(create account): https://grafana.com/
- Node exporter repo: https://github.com/prometheus/node_exporter
- Create Alerts: https://grafana.com/docs/grafana/latest/alerting/alerting-rules/