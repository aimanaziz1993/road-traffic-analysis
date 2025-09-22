# Full-Stack .NET 8 and React Application with Docker

This project serves as a ready-to-use template for a full-stack web application using a .NET 8 REST API backend and a React.js frontend. The entire application is containerized using Docker and orchestrated with Docker Compose, allowing for a seamless, one-command setup in any local development environment.

## Features

-   **Backend:** .NET 8 Web API
-   **Frontend:** React.js + Vite + Typescript
-   **Containerization:** Docker & Docker Compose
-   **Development Ready:** Pre-configured for cross-container communication.
-   **API Documentation:** Swagger UI is enabled for easy API testing and exploration.

---

## Prerequisites

Before you begin, ensure you have the following installed on your system (this guide is tailored for macOS but is applicable to Windows/Linux):

-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)
-   [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
-   [Node.js and npm](https://nodejs.org/en/)

---

## Getting Started

Follow these steps to get the application running locally.

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone <your-repository-url>
cd road-traffic-analysis
```

### 2. Build and Run the Application

Navigate to the root directory of the project (where the `docker-compose.yml` file is located) and run the following command:

```bash
docker compose up --build
```

-   `--build`: This flag tells Docker Compose to build the images from the Dockerfiles before starting the containers. You should use this the first time you run the application or after making any changes to the code or Dockerfiles.
-   For subsequent runs, you can simply use `docker compose up`.

The first build may take a few minutes as it needs to download the base Docker images and install all dependencies.

### 3. Access the Application

Once the containers are running, you can access the different parts of the application:

-   **Frontend (React App):**
    -   URL: [http://localhost:3000](http://localhost:3000)
    -   You should see a page displaying a list of items fetched from the backend API.

-   **Backend (Swagger UI):**
    -   URL: [http://localhost:5050/swagger](http://localhost:5050/swagger)
    -   Use the Swagger interface to explore and test the API endpoints directly.

### 4. Stopping the Application

To stop all running containers, press `Ctrl + C` in the terminal where Docker Compose is running.

To remove the containers completely, you can run:

```bash
docker compose down
```

---

## Project Structure

The project is organized into two main folders:

```
road-traffic-analysis/
├── backend/            # .NET Web API project source code
│      └── Dockerfile   # Docker instructions for the backend
├── frontend/           # React.js project source code
│      └── Dockerfile   # Docker instructions for the frontend
├── .gitignore          # Specifies files to ignore for Git
├── docker-compose.yml  # Defines and orchestrates the services
└── README.md           # This file```