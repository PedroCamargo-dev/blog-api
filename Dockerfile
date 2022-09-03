FROM node:lts

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app
