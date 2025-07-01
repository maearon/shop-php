# Base image để chạy app (runtime-only)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Build image có SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy source code
COPY . .

# Restore dependencies
RUN dotnet restore "DotNetBoilerplate.csproj"

# Build và publish app ra thư mục /app/publish
RUN dotnet publish "DotNetBoilerplate.csproj" -c Release -o /app/publish

# Final image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

# Run app
ENTRYPOINT ["dotnet", "DotNetBoilerplate.dll"]
