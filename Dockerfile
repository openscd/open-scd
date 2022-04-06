FROM nginx:latest
COPY build/. /usr/share/nginx/html/

VOLUME /usr/share/nginx/html/public/cim
