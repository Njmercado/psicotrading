# Use official nginx image as base
FROM nginx:alpine

# Copy your static site files to nginx public directory
COPY . /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start nginx (default command provided by the base image)
