# Nginx

Nginx 是一款轻量级的 Web 服务器、反向代理服务器，由于它的内存占用少，启动极快，高并发能力强，在互联网项目中广泛应用。

## 默认配置语法

```shell
# nginx.conf 默认配置文件

#设置 nginx 服务的系统使用用户
user  nginx;
#工作进程数
worker_processes  auto;
#nginx 的错误日志
error_log  /var/log/nginx/error.log notice;
#nginx 服务启动时候的 pid
pid        /var/run/nginx.pid;

events {
    #每个进程允许最大连接数
    worker_connections  1024;
}
# 一个http下允许有多个server，一个server下允许有多个location
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    #访问日志
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    #访问日志
    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #客户端和服务端链接超时时间默认65秒
    keepalive_timeout  65;

    #gzip  on;

    # 加载目录下以.conf的nginx配置，
    include /etc/nginx/conf.d/*.conf;
}
```

```shell
#/etc/nginx/conf.d/default.conf;
server {
    listen       80;
    listen  [::]:80;
    #域名地址
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        #资源存放目录
        root   /usr/share/nginx/html;
        #首页
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

## 虚拟主机

通俗的讲：就是一个 nginx 配置多个服务

- 所谓虚拟主机，在 Web 服务里就是一个独立的网站站点，这个站点对应独立的域名（也可能是 IP 或端口），具有独立的程序及资源，可以独立地对外提供服务供用户访问。
- 在 Nginx 中，使用一个 server{} 标签来标识一个虚拟主机，一个 Web 服务里可以有多个虚拟主机标签对，即可以同时支持多个虚拟主机站点。
- 虚拟主机有三种类型：基于域名的虚拟主机、基于端口的虚拟主机、基于 IP 的虚拟主机。
- 域名虚拟主机通过配置 server_name，端口和 IP 虚拟主机通过 listen 实现
