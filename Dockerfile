# Base image
FROM node:lts-alpine

# Set Author
LABEL maintainer="Abhijeet Dange <abhijeet.dange@infobeans.com>"

# Set current working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN yarn install

# start app
CMD ["yarn", "serve"]


## To start the compilation process command is:-
# docker-compose up

## To install/add any new package in running container:-
# docker exec -it <container-id 9d5a9797ba9d> yarn add vuetify
