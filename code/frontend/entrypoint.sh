#!/bin/sh

# Replace env variables and write final nginx.conf
envsubst '$BACKEND_URL $ENVIRONMENT $APP_VERSION' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start NGINX in the foreground
exec nginx -g 'daemon off;'
