# Stage 1: Build the Angular app
FROM node:latest AS build

# Set the working directory inside the container
WORKDIR /usr/local/app

# Copy the project files into the container
COPY . .

# Install project dependencies
RUN npm install

# Build the Angular app for production
RUN npm run build --prod

# Stage 2: Serve the app with NGINX
FROM nginx:latest

# Copy the built Angular app from the first stage to the NGINX html folder
COPY --from=build /usr/local/app/dist/angular_v18/browser /usr/share/nginx/html

# Copy the custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80
