# Frontend Dockerfile single stage - simple and clean 
FROM node:20-alpine
# Working directory
WORKDIR /app
# Install deps
COPY package*.json ./
RUN npm install
# Copy source
COPY . .
# API base URL (build-time)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
# Build frontend
RUN npm run build
# Install a lightweight static server
RUN npm install -g serve
# Expose frontend port
EXPOSE 3000
# Serve the built app
CMD ["serve", "-s", "dist", "-l", "3000"]


# multi-stage explained in a fun way below -comment uncomment to use whichever necessary


# # build stage the same like backend but so much worse... this looks bomb but took a lot of time instead i could have used ai for this 
# FROM node:20-alpine AS build
# # set working directory again
# WORKDIR /app
# # copy package files and install dependencies because we need them to build our frontend app else how will it work huh?
# COPY package*.json ./
# RUN npm install
# # copy all the source code LIKE A BOSS
# COPY . .
# # NOW THIS IS IMPORTANT ELSE EVERYTHING WILL BREAK. we set the api base url for our frontend app using build args. cuz frontend needs to know where the backend is at right?
# # ELSE ITS LIKE A LOST CHILD WANDERING IN THE DARKNESS OF THE IT WORLD. SCARY AF. HIS FACE IS SCARY AND UGLY ANYWAY I MEAN THE CLOWN FROM IT MOVIE.
# ARG VITE_API_BASE_URL
# ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
# # now we build the frontend app for production cuz we want it to be fast and efficient like a cheetah on steroids
# RUN npm run build

# # runtime stage - using nginx cuz its lightweight and fast like flash ONLY IF YOURE A DC FAN CUZ IAM 
# FROM nginx:alpine
# # copy the built files. the cheating way again. But, it works!
# COPY --from=build /app/dist /usr/share/nginx/html
# # expose port 80 cuz nginx listens on it by default.
# EXPOSE 80
# # start nginx in the foreground to keep the container running. cuz if it stops, our app goes down like a maybe a burning paper plane. no joke
# CMD ["nginx", "-g", "daemon off;"]

# # End of Dockerfile the epic conclusion
# # YOURE STLL READING THIS? REALLY?
# # what do you expect a poem? well here it is:

# # docker docker build the jar. 
# # docker docker you raised the bar.
# # docker docker you are the star.
# # IT world depends on you.
# # cuz only a few can do what you do.

# # I HAVE NO IDEA WHAT IM SAYING ANYMORE. AND ALSO POLLUTING THE DOCKERFILE WITH RANDOM RHYMES. SORRY NOT SORRY. JAIL ME FOR THIS CRIME.