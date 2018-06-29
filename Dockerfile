# Dockerfile (tag: v3)
FROM nginx

COPY config/nginx.conf /etc/nginx/nginx.conf

WORKDIR /parcours-integration
COPY dist /parcours-integration/

EXPOSE 8080
