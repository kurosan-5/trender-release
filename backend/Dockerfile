FROM node:18-alpine

WORKDIR /var/www/backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9000
CMD ["npm", "run", "dev"]
