FROM node:latest
WORKDIR /srv
COPY . ./
RUN npm ci
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"]
