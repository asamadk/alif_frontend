# FROM ianlancaster/node-vim-nginx
# # Remove the default nginx index.html
# RUN rm -rf /var/www/html/index.nginx-debian.html
# # Copy the contents of the dist directory over to the nginx web root
# COPY /dist/* /var/www/html/
# # Expose the public http port
# EXPOSE 80
# # Start server
# CMD ["nginx", "-g", "daemon off;"]

FROM node:10
 
WORKDIR /usr/src/app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD [ "npm", "start" ]