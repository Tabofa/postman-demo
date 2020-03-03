# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install pm2 -g
RUN npm install --silent
COPY . /app

EXPOSE 3081
CMD ["pm2-runtime", "./index.js"]
