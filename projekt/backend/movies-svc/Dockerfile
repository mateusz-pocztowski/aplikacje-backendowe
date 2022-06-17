FROM node:16.13.2-alpine

RUN npm install -g npm@8.1.2
RUN mkdir -p /app/movies

WORKDIR /app/movies

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 50053

CMD npm run start:prod