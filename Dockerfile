FROM node:lts

RUN npm install -g @nestjs/cli

USER node

EXPOSE 3002

WORKDIR /home/node/app
