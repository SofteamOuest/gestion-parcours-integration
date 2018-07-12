# Dockerfile (tag: v3)
FROM nginx:alpine

COPY config/nginx.conf /etc/nginx/nginx.conf

WORKDIR /parcours-integration

RUN chmod ugo+rwx /parcours-integration/

COPY dist/gestion-evenement/* /parcours-integration/

EXPOSE 8080
