FROM node:16-alpine

WORKDIR /usr/src/api.babmuk

COPY package*.json ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]
