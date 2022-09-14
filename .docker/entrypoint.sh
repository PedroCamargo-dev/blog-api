#!/bin/sh

npm install
npm run build
npm run start:dev
npx prisma migrate dev
npx prisma generate
npx prisma studio
