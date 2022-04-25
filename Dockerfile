FROM node

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 3010

ENV AWS_BUCKET_REGION=region
ENV AWS_ACCESS_KEY=access 
ENV AWS_SECRET_KEY=secret

CMD ["pm2-runtime", "server.js", "--watch"]