FROM node:16.13.2-alpine

RUN npm install -g npm@8.1.2
RUN mkdir -p /app/auth

WORKDIR /app/auth

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 50051

CMD npm run start:prod