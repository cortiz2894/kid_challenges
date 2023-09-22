FROM node:16.18.0-alpine

WORKDIR /app

COPY package*.json .

RUN apk add --update python3 make g++\ && rm -rf /var/cache/apk/*
RUN npm install

COPY . .

RUN npm run build

CMD ["node", ".output/server/index.mjs"]

EXPOSE 3000