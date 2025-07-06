FROM node:lts-alpine AS builder
# 作業ディレクトリの設定
WORKDIR /var/www/frontend
# bash をインストール
RUN apk add --no-cache bash
# package.jsonとpackage-lock.jsonがあればコピーする
COPY package*.json ./
# 依存関係のインストール
RUN npm install
# 開発用サーバの起動
CMD ["npm", "run", "dev"]