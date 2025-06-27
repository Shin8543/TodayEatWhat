FROM openjdk:8-jdk-alpine

WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY src ./src

# Install Maven and build the application
RUN apk add --no-cache maven && \
    mvn clean package -DskipTests && \
    apk del maven

# Create a smaller runtime image
FROM openjdk:8-jre-alpine

# Install curl for health check
RUN apk add --no-cache curl

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=0 /app/target/backend-1.0.0.jar app.jar

EXPOSE 4000

CMD ["java", "-jar", "app.jar"] 