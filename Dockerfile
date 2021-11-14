FROM node:14
RUN npm install -g npm@latest
RUN npm install -g yarn --force
WORKDIR /app
COPY --chown=node:node ./ ./
RUN yarn
CMD ["yarn", "gulp"]