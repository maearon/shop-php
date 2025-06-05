FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

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
ENTRYPOINT ["dotnet", "AdidasApi.dll"]
