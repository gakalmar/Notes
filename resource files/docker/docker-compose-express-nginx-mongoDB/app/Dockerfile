FROM node:alpine3.20

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
