FROM node:20.11.0 as Build

WORKDIR /app

COPY . /app

RUN rm -rf node_modules

RUN npm install

FROM node:20.11.0-alpine

WORKDIR /app

COPY --from=Build /app /app

EXPOSE 3200

ENTRYPOINT [ "node", "./app.js" ]