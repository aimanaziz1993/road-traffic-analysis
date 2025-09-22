# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
# Make sure your project file is named "backend.csproj"
COPY ["backend.csproj", "."]
RUN dotnet restore "./backend.csproj"

# Copy the rest of the backend code and build the app
COPY . .
RUN dotnet build "backend.csproj" -c Release -o /app/build

# Publish the app
FROM build AS publish
RUN dotnet publish "backend.csproj" -c Release -o /app/publish

# Use the official ASP.NET Core runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Expose port 5000 - the port our app will run on inside the container
EXPOSE 5050

# Set the environment variable for the URLs
# This tells the app to listen on port 5000 for any IP address.
ENV ASPNETCORE_URLS=http://+:5050

# Correct the entrypoint to use your project's dll name.
# If your project is "backend.csproj", the output will be "backend.dll"
ENTRYPOINT ["dotnet", "backend.dll"]