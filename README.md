# Restaurant Staff Scheduling System

A full-stack restaurant staff scheduling application built with Laravel, React, and PostgreSQL.

## Features

- Create and delete staff members
- Create and delete shifts
- Assign staff members to shifts
- Prevent assigning staff to shifts with a different role
- Prevent overlapping shifts for the same staff member
- Responsive React frontend
- RESTful Laravel API backed by PostgreSQL

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite

### Backend

- Laravel
- PHP 8.3

### Database

- PostgreSQL

### Infrastructure

- Docker
- Docker Compose

---

## Project Structure

```
frontend/
backend/
docker-compose.yml
```

---

## Getting Started

### Prerequisites

- Docker Desktop

### Run with Docker

```bash
docker compose up --build
```

Once the containers are running:

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:8000
```

---

## Local Development

### Backend

```bash
cd backend

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate --seed

php artisan serve
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Business Rules

- Staff members may only be assigned to shifts matching their role.
- Staff members cannot be assigned to overlapping shifts on the same day.
- Adjacent shifts are allowed (for example, one shift ending at 2:00 PM and another beginning at 2:00 PM).

---

## Assumptions

- A staff member has one role.
- A shift is assigned to at most one staff member.
- Roles are predefined (Server, Cook, Manager).

---

## Future Improvements / Out of Scope

- Edit existing staff and shifts
- Authentication and authorization
- Search and filtering
- Pagination
- End-to-end testing
