# To-Do Web Application

Containerized full-stack application implementing a To-Do list. Demonstrating Clean Architecture, SOLID principles, and a Test Driven methodology for enterprise environments.

## Tech Stack

- Frontend: React 18, TypeScript, Tailwind CSS, Vite, Axios, Vitest (Testing)

- Backend: Java 21, Spring Boot 3.4, Spring Data JPA, Flyway, Lombok

- Database: PostgreSQL 15

- Infrastructure: Docker & Docker-Compose, Nginx

## Getting Started

Prerequisites for deployment only: Docker & Docker Compose (Desktop or Engine)
Prerequisites for local development: Node.js 20+, JDK 21+ , Docker & Docker-Compose

Step 1. Clone the repo

Clone the repo using the bash command if you have git installed

```bash
git clone https://github.com/githmin/to-do-tasks.git
```

or

Select Code -> Download ZIP on github.com/githmin/to-do-tasks

Step 2. Setup Environment Variables

An example structure is given as ".env.example" in the repo. You may use the example as is, just rename it to ".env" in the exact same location or execute the below command on the root directory of the project

```bash
cp .env.example .env
```

Step 3. Build And Run

Once the environment variables are set, execute the below command.

```bash
docker-compose up -d --build
```

Step 4. Access The Application

Open your web browser and navigate to http://localhost:8080
