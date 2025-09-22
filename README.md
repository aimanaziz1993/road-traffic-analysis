# Full-Stack Location Analysis Tool for "Best Burger Teramat Viral"

This project is a full-stack web application designed to help "Best Burger Teramat Viral" identify promising locations for a new outlet in Selangor. It analyzes road traffic data to rank the top 10 busiest roads based on various filters.

The application features a .NET 8 REST API backend and a React.js frontend, containerized with Docker for a seamless, one-command setup.

## Features

-   **Backend:** .NET 8 Web API that loads and processes road data from a CSV file.
-   **Frontend:** React.js with Redux Toolkit and RTK Query for state management.
-   **Dynamic Filtering:** Filter roads by city, road type, and minimum number of lanes.
-   **Data Visualization:**
    -   A ranked list of the top 10 roads.
    -   An interactive map view using `react-leaflet` that visualizes road segments colored by traffic density.
-   **Containerization:** Fully containerized with Docker & Docker Compose.
-   **API Documentation:** Swagger UI enabled at `/swagger` for API exploration.

---

## Prerequisites

-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)
-   An internet connection to download base images and dependencies.

---

## Getting Started

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

-   `--build`: This flag builds the Docker images from scratch. Use it the first time you run the app or after any code changes.
-   For subsequent runs, you can simply use `docker-compose up`.

The first build may take a few minutes to complete.

### 3. Using the Application

Once the containers are running, you can access the application:

-   **Main Dashboard (Frontend):**
    -   URL: [http://localhost:3000](http://localhost:3000)
    -   Use the filters in the sidebar and click "Run Analysis" to see the results.

-   **Backend API (Swagger UI):**
    -   URL: [http://localhost:5050/swagger](http://localhost:5050/swagger)
    -   Use the Swagger interface to test the `/api/analysis` endpoint directly.

### 4. Stopping the Application

To stop the running containers, press `Ctrl + C` in the terminal. To remove the containers and network, run:

```bash
docker-compose down
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