FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test 

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]
