FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

# Carpeta para SQLite
RUN mkdir -p /app/data
ENV ASPNETCORE_URLS=http://+:80
COPY spinlab.db /app/data/spinlab.db

ENTRYPOINT ["dotnet", "SpinLab.Api.dll"]
