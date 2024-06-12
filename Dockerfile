FROM node:18.20.2
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .env 
RUN npm install
COPY . .
CMD [ "npm", "run", "start"]