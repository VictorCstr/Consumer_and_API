FROM node:lts-slim as development
WORKDIR /code

COPY api/package*.json ./
COPY api/tsconfig.json ./
COPY api/.env ./

RUN apt-get update -y && apt-get install -y openssl
RUN npm install 

COPY api/prisma/ /code/prisma
COPY api/src/ /code/src 

RUN npx prisma generate
CMD npx prisma migrate dev && npm run dev

