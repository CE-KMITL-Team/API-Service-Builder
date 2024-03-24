FROM mysql:latest

ENV MYSQL_DATABASE="api-service-builder"
ENV MYSQL_ALLOW_EMPTY_PASSWORD="yes"

COPY ./api-service-builder.sql /docker-entrypoint-initdb.d/api-service-builder.sql

EXPOSE 3306