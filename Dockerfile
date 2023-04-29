FROM node:19

# Set workdir:
WORKDIR /usr/src/app

# Install required libs for node canvas:
RUN apt-get update && apt-get install -y libuuid1 libgl1-mesa-dev

# Install deps:
COPY package*.json ./

ARG NPM_REGISTRY=https://npm.pkg.github.com/
ENV NPM_AUTH_TOKEN ${GH_TOKEN}

# Configure npm to use the registry and auth token:
RUN echo "registry=${NPM_REGISTRY}" >> .npmrc \
  && echo "//${NPM_REGISTRY}:_authToken=${NPM_AUTH_TOKEN}" >> .npmrc \
  && echo "@bottlycorp:registry=${NPM_REGISTRY}" >> .npmrc
RUN echo "registry=https://registry.npmjs.org/"
  
RUN npm install

# Copy all files:
COPY . .

CMD npm run start