FROM node:12.0-alpine

RUN apk add --no-cache bash
RUN apk add python make g++ curl jq

WORKDIR /services
COPY package*.json ./

RUN npm install -g npm
RUN npm install

COPY . ./