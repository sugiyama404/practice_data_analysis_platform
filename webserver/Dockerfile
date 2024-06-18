FROM node:20.12.2-buster-slim as development

WORKDIR /usr/src/app

COPY ./app/package*.json ./
RUN npm install
COPY . .
