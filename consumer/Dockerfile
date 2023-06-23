FROM node:lts-slim as development
WORKDIR /code

COPY consumer/package*.json ./
COPY consumer/tsconfig.json ./
COPY consumer/.env ./

RUN apt-get update -y && apt-get install -y openssl
RUN npm install 

COPY consumer/prisma/ /code/prisma
COPY consumer/src/ /code/src 

RUN npx prisma generate
CMD npm run dev

