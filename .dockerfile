FROM node:21

WORKDIR /main/app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

CMD ["pnpm", "start:dev"]
