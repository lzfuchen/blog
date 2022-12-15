FROM node:16-alpine as builder

MAINTAINER "fuchen"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --registry=https://registry.npmmirror.com/

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx

COPY --from=builder /usr/src/app/docs/.vitepress/dist /usr/share/nginx/html

EXPOSE 80