FROM node:lts

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install -g @nestjs/cli

RUN npm install

EXPOSE 3002

CMD ["npm", "run", "start:dev"]