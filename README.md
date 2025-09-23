# 🍔 Location Intelligence Dashboard for Best Burger Teramat Viral

This project is an advanced, full-stack web application designed to provide data-driven insights for "Best Burger Teramat Viral." It moves beyond simple data display to offer a sophisticated analysis tool that helps identify prime locations for new outlets based on a holistic scoring model.

The application features a robust .NET 8 backend acting as an analysis engine and a modern, interactive Vite + React frontend for a premium user experience. The entire system is containerized with Docker for a seamless, one-command setup.

---

### [Screenshot]
<img width="1436" height="790" alt="Screenshot 2025-09-23 at 4 10 35 AM" src="https://github.com/user-attachments/assets/5ff8fc06-3e77-45ba-9e1f-026f81fcd691" />

---

## 🚀 Key Features & Enhancements

This dashboard is built with several advanced features to provide precise, actionable intelligence:

### 🧠 Advanced Scoring Model
Instead of just relying on raw traffic, the application calculates a proprietary **`LocationPotentialScore`**. This powerful metric provides a more accurate assessment of a location's business potential by intelligently weighting multiple factors:
-   **Traffic Index:** The foundational metric for volume.
-   **Road Type:** A critical multiplier that favors accessible secondary roads over high-speed expressways.
-   **Speed Limit:** Lower speeds are scored higher, reflecting increased driver visibility and impulse-stop potential.
-   **Number of Lanes & Direction:** Modifiers that account for traffic volume and accessibility from multiple directions.

### 🗺️ Dynamic & Interactive Map View
-   **Multiple Map Layers:** Users can instantly switch between two visualization modes for deeper analysis:
    -   **Lines View:** Renders road segments colored by their `LocationPotentialScore`, from red (low potential) to green (high potential).
    -   **Heatmap View:** Provides an intuitive, high-level overview of location potential "hotspots" across a region.
-   **Accurate Geospatial Analysis:** The heatmap is not based on simple start/end points. The backend performs **geospatial interpolation** to generate a dense series of points along the entire length of each road, resulting in a highly accurate and practical visualization.
-   **Animated Map Transitions:** When an analysis is run, the map smoothly "flies" and zooms to fit the results, providing a polished and intuitive user experience.
-   **Modern Dark Theme:** Utilizes dark-themed map tiles that blend seamlessly with the dashboard UI.

### ✨ Modern Intelligence UI
-   **Dark Theme & Glassmorphism:** The UI is designed to look like a modern intelligence dashboard, using a dark theme with floating, blurred "glass" panels that are less obstructive to the map view.
-   **Fetch on Load:** The dashboard is immediately useful, automatically loading and displaying a region-wide analysis the moment the page is opened.
-   **Rich, Data-Driven Panels:** The results panel clearly displays the `LocationPotentialScore` with a visual bar, along with the key factors that contributed to the ranking.

### ⚙️ Robust Tech Stack
-   **Backend:** .NET 8 API using **NetTopologySuite** for professional-grade geospatial processing and a custom-built scoring engine.
-   **Frontend:** A fast, modern, and type-safe frontend built with **Vite, React, and TypeScript**.
-   **State Management:** Centralized and predictable state management with **Redux Toolkit and RTK Query**.

---

## The Scoring Model in Detail

The `LocationPotentialScore` is calculated using the following weighted model:

| Factor          | Logic                                                       | Weight / Multiplier |
| --------------- | ----------------------------------------------------------- | ------------------- |
| **Traffic Index** | The base score for raw traffic volume.                      | 40%                 |
| **Speed Limit**   | A normalized score rewarding lower, high-visibility speeds. | 30%                 |
| **Lanes**         | A score that rewards higher lane counts (volume).           | 15%                 |
| **Direction**     | A bonus for `two_way` streets (better accessibility).       | 15%                 |
| **Road Type**     | **Critical Multiplier** applied to the final score.       | `x1.2` for Secondary, `x1.0` for Primary, `x0.5` for Expressway |

---

## 🛠️ Tech Stack

**Backend:**
- .NET 8 Web API
- NetTopologySuite (for Geospatial Analysis)
- C#

**Frontend:**
- Vite + React 18
- TypeScript
- Redux Toolkit & RTK Query
- Leaflet & React-Leaflet
- Leaflet.heat

**Containerization:**
- Docker & Docker Compose

---

## 🏁 Getting Started

### Prerequisites
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running on your system (macOS, Windows, or Linux).

### 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone <your-repository-url>
cd <repository-folder>
```

### 2. Build and Run the Application
From the project's root directory (where `docker-compose.yml` is located), run the following command:
```bash
docker compose up --build
```
-   The `--build` flag is essential for the first run or after any code changes.
-   The initial build may take a few minutes to download the necessary Docker images and install all dependencies.

### 3. Access the Application
Once the containers are running, you can access the different parts of the application:

-   **📍 Main Dashboard (Frontend):**
    -   **URL: [http://localhost:3000](http://localhost:3000)**

-   **⚙️ Backend API (Swagger UI):**
    -   **URL: [http://localhost:5050/swagger](http://localhost:5050/swagger)**

### 4. Stopping the Application
To stop all running containers, press `Ctrl + C` in the terminal where Docker Compose is running. To remove the containers and network, run:
```bash
docker compose down
```

---

## 🔮 What's Next: Future Enhancements

This application provides a powerful foundation for location intelligence. The following features are planned to further enhance its analytical capabilities and provide even deeper, more actionable insights.

### Deeper & More Granular Analysis

1.  **Competitor Layer:**
    -   **Goal:** Visualize the locations of competing businesses on the map to analyze market saturation.
    -   **Implementation:** Add a toggleable map layer that plots known competitor locations, allowing for strategic analysis of proximity and potential market gaps.

2.  **Scoring Model Tuner:**
    -   **Goal:** Empower users to adjust the analysis to fit different business strategies (e.g., prioritizing visibility over raw traffic).
    -   **Implementation:** Introduce an "Advanced Scoring" panel with sliders that allow users to dynamically adjust the weights of each factor (`Traffic`, `Speed`, `Road Type`, etc.) and see the results update in real-time.

3.  **Time-of-Day Analysis:**
    -   **Goal:** Analyze how location potential changes throughout the day to align with peak business hours.
    -   **Implementation:** Add a filter to simulate traffic patterns during "Morning Rush," "Lunchtime," and "Evening Rush," using different traffic index data for each period.

### Richer User Interaction & Experience

4.  **Interactive Chart Visualization:**
    -   **Goal:** Provide an alternative, more comparative view of the top-ranked locations.
    -   **Implementation:** Add a toggle to switch the results panel to a bar chart view, where each bar represents a location's `LocationPotentialScore`. Bars will be clickable to zoom to the corresponding road on the map.

5.  **"Draw an Area" Custom Analysis:**
    -   **Goal:** Move beyond city-based filtering to allow for hyper-focused, custom-defined analysis zones.
    -   **Implementation:** Integrate a drawing tool that allows users to draw a polygon directly on the map and run the entire analysis pipeline exclusively on the roads within that custom boundary.

### Production Readiness & Enterprise Features

6.  **API Caching & Performance Optimization:**
    -   **Goal:** Ensure the application is fast and scalable, even with larger datasets or more users.
    -   **Implementation:** Introduce a caching layer on the backend to store the results of recent analyses, providing instantaneous responses for repeated queries.

7.  **Unit & Integration Testing:**
    -   **Goal:** Guarantee application stability and reliability as new features are added.
    -   **Implementation:** Develop a comprehensive test suite for both the backend (using xUnit) and frontend (using Vitest) to automate quality assurance and prevent regressions.

8.  **Save & Compare Scenarios:**
    -   **Goal:** Allow users to save different analysis configurations and compare their results side-by-side.
    -   **Implementation:** Add functionality to save a complete analysis (filters, weights, and results) as a named "scenario." A dedicated comparison view would then allow users to load and contrast multiple scenarios to make the best possible decision.
