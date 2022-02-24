FROM node:14.18.2-alpine

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT

ARG DB_HOST=localhost
ENV DB_HOST $DB_HOST

ARG DB_PORT=3306
ENV DB_PORT $DB_PORT

ARG DB_TYPE=mysql
ENV DB_TYPE $DB_TYPE

ARG DB_USER=dummy
ENV DB_USER $DB_USER

ARG DB_PASS=dummy
ENV DB_PASS $DB_PASS

ARG DB_DBASE=codelogicxves
ENV DB_DBASE $DB_DBASE

ARG JWT_ACCESS_TOKEN_SECRET=rANd0m34673
ENV JWT_ACCESS_TOKEN_SECRET $JWT_ACCESS_TOKEN_SECRET

ARG JWT_REFRESH_TOKEN_SECRET=RanD0M65749
ENV JWT_REFRESH_TOKEN_SECRET $JWT_REFRESH_TOKEN_SECRET

RUN apk update && apk add git
RUN npm install pm2 -g
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

USER node
WORKDIR /home/node/app
RUN git clone https://github.com/DebdutBiswas/codelogicx-ves-api.git
WORKDIR /home/node/app/codelogicx-ves-api
RUN mkdir -p /home/node/app/codelogicx-ves-api/node_modules
RUN npm install

EXPOSE 3000
CMD [ "pm2-runtime", "app.js" ]