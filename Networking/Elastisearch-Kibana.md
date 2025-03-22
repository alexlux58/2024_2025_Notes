192.168.4.121
+2_8B6gFu5U_v7OYltrb

https://192.168.4.121:5601/app/integrations/browse

curl -X GET "localhost:9200"
curl -k -X GET "https://localhost:9200" -u elastic:+2_8B6gFu5U_v7OYltrb

root@elk:/etc/elasticsearch# sudo /usr/share/elasticsearch/bin/elasticsearch-service-tokens create elastic/kibana kibana_token
SERVICE_TOKEN elastic/kibana/kibana_token = AAEAAWVsYXN0aWMva2liYW5hL2tpYmFuYV90b2tlbjpZSGhGMlpuV1NVMlVjZDZ0UVluMk9B

50 sudo journalctl -u kibana -f
51 sudo -u kibana /usr/share/kibana/bin/kibana --verbose

root@elk:/etc/elasticsearch# sudo /usr/share/elasticsearch/bin/elasticsearch-service-tokens create elastic/kibana kibana_token_v2 --verbose
SERVICE_TOKEN elastic/kibana/kibana_token_v2 = AAEAAWVsYXN0aWMva2liYW5hL2tpYmFuYV90b2tlbl92MjowS1JaQ3F2Q1FXaWk4VDhmX3ZqOXlB
