# Stage 1: Build the JAR using Maven and JDK 19
FROM maven:3.9.5-eclipse-temurin-19 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run the application using JDK 19 slim image
FROM openjdk:19-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
