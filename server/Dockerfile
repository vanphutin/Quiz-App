# chuẩn bị môi trường node js / version 
FROM node:14-alpine

# nơi lưu trữ source code

WORKDIR /quizapp/backend

COPY package*.json ./

RUN npm install

RUN  npm install -g @babel/core @babel/cli

COPY  . .

RUN npm run build-src

CMD [ "npm","run","build" ]

# docker build --tag node-docker .

