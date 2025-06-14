FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY apps/api/AdidasApi.csproj .
RUN dotnet restore "AdidasApi.csproj"
COPY apps/api/ .
RUN dotnet build "AdidasApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AdidasApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f --head https://localhost:7217/up || exit 1
EXPOSE 7217
ENTRYPOINT ["dotnet", "AdidasApi.dll"]
