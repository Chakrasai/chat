#use Node.js as base image 
FROM node:18

#set working directory
WORKDIR /app

#copy package.json and package-lock.json
COPY package*json ./

#install dependencies
RUN npm ci

#copy source code
COPY . .

#expose port
EXPOSE 5173

