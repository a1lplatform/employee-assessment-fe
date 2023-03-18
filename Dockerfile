# Stage 0: compile angular frontend
FROM node:latest as build
WORKDIR /app
COPY . . 

ARG API_URL
ENV API_URL $API_URL

RUN npm install
RUN npm run build --prod

# Stage 1: serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/employee-management  /usr/share/nginx/html/qlhr
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80