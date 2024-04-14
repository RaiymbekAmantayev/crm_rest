FROM node:14 AS Production

WORKDIR /usr/src/api

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm install --save-dev @babel/core @babel/cli @babel/preset-env
ENV PATH="/node_modules/.bin:${PATH}"

COPY . .

RUN npm run build

CMD ["sh", "-c", "node app.js"]

