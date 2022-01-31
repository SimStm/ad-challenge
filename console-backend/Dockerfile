# Builder
FROM node:16.13.2-alpine AS builder
WORKDIR /app

RUN apk update && apk add bash curl npm && rm -rf /var/cache/apk/*

# Download node-prune
# RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# COPY package*.json ./
# RUN npm i
# COPY . .

# RUN npm prune --production
# RUN /usr/local/bin/node-prune


# # Minimalistic image
# FROM node:16.13.2-alpine
# WORKDIR /app
# COPY --from=builder /app ./

COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 3200
ENTRYPOINT [ "npm", "start" ]