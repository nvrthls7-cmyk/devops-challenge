FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app

# create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /app/target/*.jar app.jar

# give ownership to non-root user
RUN chown -R appuser:appgroup /app

# run as non-root user
USER appuser

EXPOSE 8085
ENTRYPOINT ["java","-jar","app.jar"]

