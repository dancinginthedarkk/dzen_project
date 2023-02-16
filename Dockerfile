FROM node:16.17.1

WORKDIR /2022-autumn-a.motrikala

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY server.js .
COPY queries.js .
COPY migrations .

COPY . .


