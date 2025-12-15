# =========================
# Frontend Dockerfile
# =========================
# build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# runtime stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# End of Dockerfile - the epic conclusion
# YOURE STLL READING THIS? REALLY?
# what do you expect a poem? 

# docker docker build the jar. 
# docker docker you raised the bar.
# docker docker you are the star.
# IT world depends on you.
# cuz only a few can do what you do.
# I HAVE NO IDEA WHAT IM SAYING ANYMORE. AND ALSO POLLUTING THE DOCKERFILE WITH RANDOM RHYMES. SORRY NOT SORRY. JAIL ME FOR THIS CRIME.