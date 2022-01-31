# Development image
#FROM node:lts AS dev
FROM node:16.13.2-alpine AS dev

WORKDIR /code
COPY package.json /code/package.json
#RUN yarn install --production
RUN npm install --production

COPY . /code

ENV CI=false
ENV PORT=3000

#CMD ["yarn", "start"]
CMD ["npm", "start"]

# Builder
FROM dev AS build
#RUN yarn run build
RUN npm run build

# Minimalistic image
FROM nginx:1.21-alpine
COPY --from=build /code/build /usr/share/nginx/html
COPY --from=build /code/nginx/default.conf /etc/nginx/conf.d/default.conf