FROM nginx:alpine

# Install envsubst
RUN apk add --no-cache gettext


COPY nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY /public /usr/share/nginx/html/myapp

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]


