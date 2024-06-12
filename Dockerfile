FROM node:20

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV MODEL_URL=https://storage.googleapis.com/modelinceptionv3/InceptionV3/model.json

ENV PORT 8080

EXPOSE $PORT

CMD ["npm", "run", "start"]