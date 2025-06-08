# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8081

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY services/order-service/OrderService.csproj ./services/order-service/
RUN dotnet restore ./services/order-service/OrderService.csproj

# Copy the rest of the source
COPY services/order-service/ ./services/order-service/

# Publish the application
RUN dotnet publish ./services/order-service -c Release -o /app/publish

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "OrderService.dll"]
