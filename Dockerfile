# base image
FROM node:lts

# create & set working directory
RUN mkdir -p /usr
WORKDIR /usr

# copy source files
COPY ./src /usr/src

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./.env
COPY tsconfig.json ./tsconfig.json
COPY next.config.js ./next.config.js
COPY next-env.d.ts ./next-env.d.ts

# Does something about ssl certificates
RUN apt-get -qy update && apt-get -qy install openssl

# install dependencies
RUN npm install

RUN npm install @prisma/client

# COPY . .
# RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npx prisma migrate dev --name dev
# start app
# RUN npm run build
EXPOSE 3000
CMD npm run dev