# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application dependencies
RUN yarn install

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the application will be listening on
EXPOSE 3000

# Specify the command to run the application
CMD [ "yarn", "start" ]
