# Dockerfile (tag: v3)
FROM nginx

RUN ls -la

RUN apt update

RUN apt install -y curl gnupg sudo

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -

RUN sudo apt-get install -y nodejs

COPY config/nginx.conf /etc/nginx/nginx.conf

ADD . /src

RUN npm install

RUN cd /src; npm run-script build

RUN mkdir /parcours-integration

RUN chmod ugo+rwx /parcours-integration/

COPY /src/dist/gestion-evenement/* /parcours-integration/

WORKDIR /parcours-integration

EXPOSE 8080
