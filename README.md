# Cinema Ticket Booking App

This repository contains the Customer microservice of the Cinema Ticket Booking Application. The application is built using React JS, Spring Boot, JPA, Spring Security, Confluent Kafka, Protobuf, gRPC, and MySQL. It supports functionalities such as registration with email verification, password reset via email, login, movie search with pagination, viewing movie details, seat booking, ticket downloading, and email notifications.
### Registration Page
![Registration Page](https://drive.google.com/file/d/10j7CUOlEzT8vwmsxjmv09rTp9lUkNYOZ/view?usp=drive_link)

### Movie Search
![Movie Search](https://drive.google.com/file/d/12EhhzTvHYpZVaXqKbfjztFP69eqD2I0T/view?usp=drive_link)

### Seat Booking
![Seat Booking](https://drive.google.com/file/d/1t0O2Yg_qggAneFjuHrrrpgqqLXsBRUOo/view?usp=drive_link)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)

## Technologies Used

- **Frontend:**
  - React JS
  - Axios
  - Ant Design

- **Backend:**
  - Spring Boot
  - JPA (Java Persistence API)
  - Spring Security
  - MySQL
  - JWT (JSON Web Token)
  - Confluent Kafka
  - Protobuf (Protocol Buffers)
  - gRPC

## Features

- **User Authentication:**
  - Registration with email verification
  - Login with JWT-based authentication
  - Password reset via email

- **Movie Management:**
  - Search movies with pagination
  - View movie details

- **Ticket Booking:**
  - View seat map and book seats
  - Download ticket
  - Receive ticket details via email

## Prerequisites

- **Node.js** (for the frontend)
- **Java 11** (for the backend)
- **MySQL** (for the database)
- **Kafka** (for message brokering)
- **Protobuf and gRPC** (for inter-service communication)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/LulakshiHettiarachchi/cinema.git
cd cinema
