# Use the official Python image as the base image
FROM node:18-alpine3.19

# Set label
LABEL org.opencontainers.image.source="https://github.com/cursorweb/Cycle-Bot-Game"

# Set the working directory in the container
WORKDIR /app

# Copy the poetry.lock and pyproject.toml files to the container
COPY package.json package-lock.json /app/

# Install project dependencies using poetry
RUN npm i
RUN npm run prod

# Copy the rest of the project files to the container
COPY . /app

# Run main.py
CMD ["npm start"]