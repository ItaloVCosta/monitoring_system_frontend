
# Monitoring_sysyem_frontend

## Overview

This frontend application is built using **React** and manages servers' data by displaying their current status, CPU usage, and memory usage. It allows users to:
- View a list of servers.
- Filter servers based on status (Active, Inactive).
- Add, edit, and delete server entries.

The frontend communicates with a backend API built using **PHP** (following a Laravel-like structure) to retrieve, create, update, and delete server information.

## Prerequisites

- **Docker**: Ensure Docker is installed on your machine. You can download it [here](https://www.docker.com/get-started).
- **Docker Compose**: Make sure you have Docker Compose installed, as it will be used to build and run the application.

## How to Run the Application

To run the frontend application, follow the steps below:

### 1. Clone the Repository

Start by cloning the repository to your local machine.

```bash
git clone https://github.com/ItaloVCosta/monitoring_system_frontend.git
```
### 2. Update .env file

Update the .env files with the environment variables.

### 3. Run Docker Compose

To build and start the application using Docker Compose, run the following command in the root directory of the project:

```bash
docker-compose up --build
```

This command will:
- Build the frontend application.
- Set up all the necessary containers (frontend and backend if necessary).
- Serve the React application.

Once Docker has built the application, the frontend will be accessible at [http://localhost:3000](http://localhost:3000). Remember of include .env variables, and when .env is changed, the container need to be restarted.

### 4. Stop the Application

To stop the Docker containers, press `CTRL+C` in the terminal where the application is running or use the following command in another terminal:

```bash
docker-compose down
```