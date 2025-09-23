FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["backend.csproj", "."]
RUN dotnet restore "./backend.csproj"

# Copy the rest of the backend code and build the app
COPY . .
RUN dotnet build "backend.csproj" -c Release -o /app/build

# Publish the app
FROM build AS publish
RUN dotnet publish "backend.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 5050

# Set the environment variable for the URLs
# This tells the app to listen on port 5050 for any IP address.
ENV ASPNETCORE_URLS=http://+:5050

# Correct the entrypoint to use your project's dll name.
ENTRYPOINT ["dotnet", "backend.dll"]