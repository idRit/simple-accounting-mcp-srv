FROM node:23-slim

WORKDIR /app

COPY package*.json ./
RUN npm install -D

COPY . .

EXPOSE 4200
