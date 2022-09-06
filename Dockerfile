FROM nginx:latest
COPY build/. /usr/share/nginx/html/

VOLUME /etc/nginx/conf.d
VOLUME /usr/share/nginx/html/public/cim
VOLUME /usr/share/nginx/html/public/conf
