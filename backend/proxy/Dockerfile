FROM ubuntu

RUN apt update && apt install -y nginx
RUN groupadd nginx
RUN useradd -g nginx nginx

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./server.conf /etc/nginx/conf.d/server.conf

ENTRYPOINT ["nginx"]