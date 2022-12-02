# docker

## docker 常用命令

| 命令          | 说明                              |
| ------------- | --------------------------------- |
| docker pull   | 获取 image                        |
| docker build  | 创建 image                        |
| docker images | 列出 image                        |
| docker rmi    | 删除 image                        |
| docker run    | 运行 container                    |
| docker ps     | 列出 container                    |
| docker rm     | 删除 container                    |
| docker cp     | 在 host 和 container 之间拷贝文件 |
| docker commit | 保存改动为新的 image              |

## Dockerfile 命令

| 命令       | 说明         |
| ---------- | ------------ |
| FROM       | base image   |
| RUN        | 执行命令     |
| ADD        | 添加文件     |
| COPY       | 拷贝文件     |
| CMD        | 执行命令     |
| EXPOSE     | 暴露端口     |
| WORKDIR    | 指定路径     |
| MAINTAINER | 维护者       |
| ENV        | 设定环境变量 |
| ENTERPOINT | 容器入口     |
| USER       | 指定用户     |
| VOLUME     | mount point  |

1. 如何进入、推出容器

```sh
#在 container 中启动一个 bash shell
docker exec -it containerId /bin/bash
#推出容器
exit
```
