
FROM node:14

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080
EXPOSE 8080

RUN npm run build

CMD ["npm", "run", "start:prod"]
