# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy and restore project
COPY ./apps/DotNetBoilerplate/DotNetBoilerplate.csproj ./DotNetBoilerplate/
RUN dotnet restore ./DotNetBoilerplate/DotNetBoilerplate.csproj

# Copy everything else and build
COPY ./apps/DotNetBoilerplate ./DotNetBoilerplate/
WORKDIR /src/DotNetBoilerplate
RUN dotnet publish -c Release -o /app/publish

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "DotNetBoilerplate.dll"]
