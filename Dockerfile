FROM node:18.7.0

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g nodemon  
RUN npm install

# Bundle app source and copy the files to the image
COPY . .

# Expose the post so programs outside Docker 
# (Browser, Postman, etc) can access the server port 8000 
EXPOSE 8000

# When the image is finally run in a container, execute this:
CMD [ "nodemon", "expressServer.js" ]