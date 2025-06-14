This cheat sheet includes essential NGINX service commands and installation steps, the standard directory layout for configuration and logs, the structure of configuration blocks (http, server, location), and the most frequently used directives (e.g., listen, server_name, root, index, try_files). It also covers reverse-proxy setup, SSL/TLS configuration, gzip compression, caching, URL rewriting/redirects, load balancing, FastCGI integration, logging, and rate limiting with examples and locations.

1. Installation & Service Commands
   Install NGINX on Debian/Ubuntu:

sudo apt-get update  
sudo apt-get install nginx

Start/Stop/Restart the service:

sudo service nginx start  
sudo service nginx stop  
sudo service nginx restart

Test configuration syntax before reloading:

nginx -t

Systemd commands (RunCloud package example):

systemctl start nginx-rc  
systemctl stop nginx-rc  
systemctl reload nginx-rc  
systemctl enable nginx-rc  
runcloud.io

2. Directory Structure
   Main config: /etc/nginx/nginx.conf

Sites-available (server block definitions): /etc/nginx/sites-available/

Sites-enabled (symlinks): /etc/nginx/sites-enabled/

Additional conf files (e.g., conf.d/ or extra.d/ for custom snippets): /etc/nginx/conf.d/
runcloud.io

Logs: /var/log/nginx/access.log and /var/log/nginx/error.log
linkedin.com

3. Configuration Block Structure
   HTTP context wraps all web-related directives.

Server blocks define virtual hosts:

server {
listen 80;
server_name example.com www.example.com;
…
}

Location blocks inside a server handle URI matching:

location /path/ {
…
}
gist.github.com

4. Common Directives
   listen specifies IP/port or socket. Incomplete forms default to 0.0.0.0:80 or the port alone
   gist.github.com

server_name supports exact names, wildcards, and regex (with ~ modifier)
gist.github.com

root sets the document root; index lists index files:

root /var/www/html;  
index index.html index.php;

gist.github.com

try_files tests for files or falls back:

try_files $uri $uri/ /index.html;  
gist.github.com

error_page customizes error responses:

error_page 404 /404.html;  
gist.github.com

5. Reverse Proxy
   Basic proxy_pass:

location /api/ {
proxy_pass http://backend.example.com;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
}

gist.github.com

6. SSL/TLS Configuration
   Enable SSL in server block:

server {
listen 443 ssl;
server_name example.com;
ssl_certificate /path/to/cert.crt;
ssl_certificate_key /path/to/key.key;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers HIGH:!aNULL:!MD5;
}

en.wikipedia.org

7. Gzip Compression
   Enable gzip globally or per block:

gzip on;
gzip_types text/plain application/json text/css application/javascript;
gzip_min_length 256;

8. Caching (Proxy Cache Example)
   Define cache path:

proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=mycache:10m max_size=1g inactive=60m use_temp_path=off;
github.com

Enable cache in location:

location / {
proxy_cache mycache;
proxy_cache_valid 200 302 10m;
proxy_cache_valid 404 1m;
}
github.com

9. Redirects & Rewrites
   301 Redirect:

return 301 https://$host$request_uri;

rewrite with flags:

rewrite ^/old/(.\*)$ /new/$1 permanent;
gist.github.com

10. Load Balancing
    Upstream block for round-robin:

upstream backend {
server backend1.example.com;
server backend2.example.com;
}
server {
location / {
proxy_pass http://backend;
}
}

11. FastCGI & WSGI
    PHP via FastCGI:

location ~ \.php$ {
fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
include fastcgi_params;
fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
}
gist.github.com

12. Logging & Variables
    Access & error logs:

access_log /var/log/nginx/access.log main;
error_log /var/log/nginx/error.log warn;
linkedin.com

Common variables: $host, $request_uri, $remote_addr, $http_user_agent
en.wikipedia.org

13. Rate Limiting
    Limit zones and requests:

limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;
server {
location /login {
limit_req zone=one burst=5 nodelay;
}
}
virtubox.github.io
