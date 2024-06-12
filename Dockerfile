FROM node:20

WORKDIR /src/server/app

RUN npm install

COPY . .

ENV MODEL_URL=https://storage.googleapis.com/modelinceptionv3/InceptionV3/model.json

CMD ["npm", "run", "start"]
