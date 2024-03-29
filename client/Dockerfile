FROM node:20.11.0 as Build

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

FROM node:20.11.0-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=Build /app/build /app/build

EXPOSE 3000

ENTRYPOINT [ "serve", "-s", "build", "-l", "3000" ]





 

