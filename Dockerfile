FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 9001

CMD [ "npm","run","start"]