FROM node:latest as build
WORKDIR /srv
COPY . .
RUN npm ci
ENV NODE_ENV=production
RUN npm run build

FROM nginx:alpine
RUN mkdir /usr/share/nginx/html/static
COPY --from=build /srv/build /usr/share/nginx/html

