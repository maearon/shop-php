#!/bin/bash

echo "🚀 Starting Auth Service (Java Spring Boot)..."

if [ "$SPRING_PROFILES_ACTIVE" = "development" ]; then
    echo "🔥 Starting with hot reload..."
    ./mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"
else
    echo "🏭 Starting production server..."
    java -jar target/*.jar
fi
s