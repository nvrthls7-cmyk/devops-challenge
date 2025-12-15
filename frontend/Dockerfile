# this is for production build of the frontend app

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /app/dist /usr/share/nginx/html

# think of this as the file that nginx uses to serve the frontend like a steering wheel
COPY nginx.conf /etc/nginx/conf.d/default.conf
# this is the main nginx config file like an engine of a car
COPY nginx-main.conf /etc/nginx/nginx.conf

# i cheated a bit i had to use ai and google to figure this out cuz nginx kept giving me permission denied errors.
# i built the thing from scratch what do you expect?????? i had no developer so i became the dev myself.
# BUT HEY IM A DEVOPS ENGINEER NOW SO WHATEVER GETS THE JOB DONE!!!!!! DEBUGGING IS PART OF THE JOB RIGHT? RIGHT????
# give ownership to non-root user
RUN chown -R appuser:appgroup \
  /usr/share/nginx \
  /var/cache/nginx \
  /tmp \
  /etc/nginx
# run as non-root user
USER appuser

EXPOSE 80

CMD ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]



