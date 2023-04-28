FROM node:18.16.0-alpine3.17

WORKDIR /src

COPY . .

WORKDIR /src/

RUN npm install

RUN npm run lint

EXPOSE 3000

CMD [ "npm", "start" ]
