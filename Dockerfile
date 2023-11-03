FROM node:18.16.0
WORKDIR /usr/src/app
COPY package.json ./ 
COPY pnpm-lock.yaml ./ 
RUN npm config set registry https://registry.npmmirror.com && npm install -g pnpm@8.7.5
COPY . .
RUN pnpm install && pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]