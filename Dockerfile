# Use the official Node.js v16.15.0 image as the base
FROM node:16.15.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port that the application will listen on
EXPOSE 3001

# Start the application
CMD [ "npm", "start" ]
