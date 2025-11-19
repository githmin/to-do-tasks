FROM eclipse-temurin:17-jdk-alpine AS builder

RUN apk add --no-cache maven

WORKDIR /workspace/app

COPY pom.xml pom.xml
COPY src src

RUN mvn package

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=builder /workspace/app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
