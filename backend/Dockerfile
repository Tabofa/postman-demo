# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
COPY . /app
# RUN npm run build

# production environment
# FROM nginx:1.16.0-alpine
# COPY --from=build /app /usr/share/nginx/html
EXPOSE 80
CMD ["node", "./index.js"]