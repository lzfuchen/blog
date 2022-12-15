# 基本概要

Nginx 是一个开源且高性能、可靠的 HTTP 中间件，代理服务。可以做静态资源服务器，反向代理，负载平衡器和 HTTP 缓存。

## 特点

- Nginx 采用的是多进程（单线程）+ 多路 IO 复用模型。
- Nginx 采用的 I/O 多路复用模型 `epoll`。
- CPU 亲和: 把 CPU 核心和 Nginx 工作进程绑定方式，把每个 worker 进程固定在一个 CPU 上执行，减少切换 CPU 的 cache miss，获得更好的性能

## 工作模式

- Nginx 在启动后，会以 daemon 的方式在后台运行，后台进程包含一个 `master` 进程和多个相互独立的 `worker` 进程。工作进程以非特权用户运行。
- `master` 进程主要用来管理 `worker` 进程，包含：接收来自外界的信号，向各 `worker` 进程发送信号，监控 `worker` 进程的运行状态，当 `worker` 进程退出后（异常情况下），会自动重新启动新的 `worker` 进程。
- `worker` 进程则是处理基本的网络事件。多个 `worker` 进程之间是对等的，他们同等竞争来自客户端的请求，各进程互相之间是独立的。一个请求，只可能在一个 `worker` 进程中处理，一个 `worker` 进程，不可能处理其它进程的请求。

工作线程处理实际的请求。Nginx 使用**基于事件**的模型和**依赖操作系统**的机制来有效地在工作进程之间分发请求。

> worker 进程数，一般会设置成机器 CPU 核数。因为更多的 worker 数，只会导致进程相互竞争 CPU，从而带来不必要的上下文切换。
> 使用多进程模式，不仅能提高并法率，而且进程之间相互独立，一个 worker 进程挂了不会影响其他 worker 进程。

## 虚拟主机

通俗的讲：就是一个 nginx 配置多个服务

- 所谓虚拟主机，在 Web 服务里就是一个独立的网站站点，这个站点对应独立的域名（也可能是 IP 或端口），具有独立的程序及资源，可以独立地对外提供服务供用户访问。
- 在 Nginx 中，使用一个 server{} 标签来标
  识一个虚拟主机，一个 Web 服务里可以有多个虚拟主机标签对，即可以同时支持多个虚拟主机站点。
- 虚拟主机有三种类型：基于域名的虚拟主机、基于端口的虚拟主机、基于 IP 的虚拟主机。
- 域名虚拟主机通过配置 server_name，端口和 IP 虚拟主机通过 listen 实现

## 安装目录

| 路径                                            | 类型           | 作用                                       |
| ----------------------------------------------- | -------------- | ------------------------------------------ |
| `/etc/nginx/conf.d`<br/>`/etc/nginx/nginx.conf` | 目录、配置文件 | nginx 配置文件                             |
| `/var/cache/nginx`                              | 目录           | nginx 的缓存目录                           |
| `/var/log/nginx`                                | 目录           | nginx 的日志目录                           |
| `/usr/share/nginx/html`                         | 文件           | nginx 默认的静态资源目录                   |
| `/etc/nginx/mime.types`                         | 配置文件       | 设置 HTTP 协议的 Content-Type 与扩展名对应 |

## 常用命令

```bash
# 启动
nginx

# 启动并指定配置文件
nginx -c /etc/nginx/nginx.conf

# 立即停止服务
nginx -s stop

# 优雅地停止服务
nginx -s quit

# 重载配置文件
nginx -s reload

# 指定配置文件
nginx -s reload -c /etc/nginx/nginx.conf

# 重启nginx 服务
systemctl restart nginx.service

# 检查配置文件是否有语法错误
nginx -t

# 检查指定的配置文件
nginx -t -c /etc/nginx/nginx.conf
```
