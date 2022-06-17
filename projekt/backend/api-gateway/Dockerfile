FROM node:16.13.2-alpine

RUN npm install -g npm@8.1.2
RUN mkdir -p /app/api-gateway

WORKDIR /app/api-gateway

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD npm run start:prod