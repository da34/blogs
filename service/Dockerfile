FROM node:lts-alpine
WORKDIR /app
# 更好的根据 Image Layer 利用缓存
ADD package.json /app/

RUN npm install -g pnpm
RUN pnpm install

ADD . /app


EXPOSE 7001
CMD pnpm start
