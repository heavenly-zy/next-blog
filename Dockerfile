FROM node:18.17.0 as build
WORKDIR /usr/src/app
COPY package.json ./ 
COPY pnpm-lock.yaml ./ 
RUN npm config set registry https://registry.npmmirror.com && npm install -g pnpm@8.7.5
COPY . .
RUN pnpm install && pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]

FROM nginx:1.25.3
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /.next/static/ /usr/share/nginx/html/