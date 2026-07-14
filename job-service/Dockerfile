FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /workspace/app
COPY pom.xml ./
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/app/target/*.jar app.jar
EXPOSE 8082
ENV PORT=8082
ENTRYPOINT ["sh", "-c", "java -jar /app/app.jar --server.port=${PORT:-8082}"]
