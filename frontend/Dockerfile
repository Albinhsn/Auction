FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package*.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent 
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . .
EXPOSE 3000
USER node
CMD ["npm", "start"]
