FROM node:20-alpine AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN npm install && npm run build

#todo: potřebujeme?
## nginx state for serving content
#FROM nginx:alpine
#
#RUN rm /etc/nginx/conf.d/default.conf
#
#COPY nginx.conf /etc/nginx/conf.d
#
## Set working directory to nginx asset directory
#WORKDIR /usr/share/nginx/html
## Remove default nginx static assets
#RUN rm -rf ./*
## Copy static assets from builder stage
#COPY --from=builder /app/build .
## Containers run nginx with global directives and daemon off
#ENTRYPOINT ["nginx", "-g", "daemon off;"]


#FROM node:20-alpine
#WORKDIR /app
#COPY . .
#RUN npm install
CMD ["npm", "start"]