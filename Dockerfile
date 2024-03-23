FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build
EXPOSE 4300
CMD [ "node", "dist/index.js" ]
