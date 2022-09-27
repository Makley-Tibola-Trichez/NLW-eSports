FROM node:16-alpine

WORKDIR /app

COPY . /app

RUN yarn

RUN npm install -g serve

RUN yarn build

EXPOSE 3000

CMD ["serve", "-s", "builp", "-p", "3000"]