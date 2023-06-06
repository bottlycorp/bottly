FROM node:18

# Set workdir:
WORKDIR /usr/src/app

# Install required libs for node canvas:
RUN apt-get update && apt-get install -y libuuid1 libgl1-mesa-dev

# Install deps:
COPY package*.json ./

ARG NPM_REGISTRY=
ARG AUTH_TOKEN
ENV NPM_AUTH_TOKEN ${AUTH_TOKEN}

# Configure npm to use the registry and auth token:
RUN echo "//npm.pkg.github.com/:_authToken=${AUTH_TOKEN}" >> .npmrc \
  && echo "@bottlycorp:registry=https://npm.pkg.github.com" >> .npmrc

RUN echo "registry=https://registry.npmjs.org/" >> .npmrc
  
RUN npm install

# Copy all files:
COPY . .

CMD npm run start