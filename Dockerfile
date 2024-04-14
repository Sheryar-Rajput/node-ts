# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --silent

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript code
RUN yarn build

#  Run migrationn script to check status 
RUN yarn run migration-status
# Run migration script (adjust if your script is located elsewhere)
# RUN yarn run migrate

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "run", "start"]
