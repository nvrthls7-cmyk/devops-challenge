FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

EXPOSE 8085

CMD ["sh", "-c", "java -jar target/*.jar"]



# just comment the single stage if you want the multi-stage build and uncomment the below multi-stage dockerfile for better optimization and smaller image size


# # this is where we start our build stage the ultimate stage cuz it does all the hardwork for the next stage
# FROM maven:3.9.6-eclipse-temurin-17
# # set the working directory inside the container its more like a room where all the stuff will happen hehe! you know...
# WORKDIR /app
# # now we copy the pom.xml and src folder into the working directory cuz we need them to build our project no joke 
# COPY pom.xml .
# COPY src ./src
# # now we run the maven command to build our project and skip the tests to save time. but, is it a good idea to skip tests? well, sometimes you gotta do what you gotta do. cuz i didnt write any tests :D
# RUN mvn clean package -DskipTests

# # ---------- Run stage ---------- a little decoration for the next stage. we use a lighter image to run our app cuz we dont need all the maven stuff here
# FROM eclipse-temurin:17-jre
# # set the working directory inside the container againnnnnnnnn!!!! cuz we like consistency dont we all?
# WORKDIR /app
# # now we copy the jar file from the build stage to this stage. this is cheating but necessary evil. 
# COPY --from=0 /app/target/*.jar app.jar
# # expose the port our app will run on. cuz apps need ports to talk to the outside world right? else we are shooting in the dark, SITTING DUCKS! IT SUCKS!
# EXPOSE 8085
# # finally we set the entrypoint to run our app. cuz without this, whats the point?
# ENTRYPOINT ["java","-jar","app.jar"]

# # we're done here! get out! not rude though :D a little humor wont hurt!