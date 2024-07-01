
# [Teamwork Hub Server](https://teamwork-hub-server.onrender.com)

## Project Overview

TeamWork Hub is a collaborative platform where users can manage projects, collaborate on documents in real-time, and provide feedback through discussions. This repository contains the backend code for the application.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- Redis
- Jsonwebtoken
- Bcryptjs

## Requirements

- Node.js (v20.x)
- MongoDB
- Redis

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/samiulalimsaad/teamwork-hub-server.git
cd teamwork-hub-backend
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```bash
NODE_ENV=your_node_env
PORT=your_port
JWT_SECRET=your_jwt_secret
REDIS_PASSWORD=your_redis_password
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
```

### 4. Start the Server

```bash
npm run dev
```

or

```bash
yarn dev
```

The backend server will be running at `http://localhost:5000`.

## API Endpoints

### User Routes

- `GET /api/users/user` - Fetch all users
- `GET /api/users/user/:id` - Fetch user by ID
- `POST /api/users/register` - Register a new user
- `PUT /api/users/user/:id` - Update user
- `DELETE /api/users/user/:id` - Delete user
- `POST /api/users/login` - Log in user
- `POST /api/users/logout` - Log out user

### Project Routes

- `GET /api/projects` - Fetch all projects
- `GET /api/projects/:id` - Fetch project by ID
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Feedback Routes

- `GET /api/feedbacks` - Fetch all feedbacks
- `GET /api/feedbacks/:id` - Fetch feedback by ID
- `POST /api/feedbacks` - Create a new feedback
- `PUT /api/feedbacks/:id` - Update feedback
- `DELETE /api/feedbacks/:id` - Delete feedback

### Chat Routes

- `GET /api/chats` - Fetch all chats
- `GET /api/chats/:id` - Fetch chat by ID
- `POST /api/chats` - Create a new chat
- `PUT /api/chats/:id` - Update chat
- `DELETE /api/chats/:id` - Delete chat

### Document Routes

- `GET /api/documents` - Fetch all documents
- `GET /api/documents/:id` - Fetch document by ID
- `POST /api/documents` - Create a new document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

### Version Routes

- `GET /api/versions` - Fetch all versions
- `GET /api/versions/:id` - Fetch version by ID
- `POST /api/versions` - Create a new version
- `PUT /api/versions/:id` - Update version
- `DELETE /api/versions/:id` - Delete version

### Current User Routes

- `GET /api/current-user` - Fetch current user

## Real-Time Collaboration

Real-time document editing and discussions are enabled using Socket.io.

## Docker and Docker Compose

To simplify the setup process, use Docker and Docker Compose to containerize the application and its dependencies.

### Docker

Ensure Docker already installed on the machine. Build and run the Docker image using the following commands:

1. Build the Docker image:

```bash
docker build -t teamwork-hub-backend .
```

2. Run the Docker container:

```bash
docker run -p 5000:5000 --env-file .env teamwork-hub-backend
```

The backend server will be running at `http://localhost:5000`.

### Docker Compose

Docker Compose allows you to define and run multi-container Docker applications. Use the following `docker-compose.yml` file to set up the application along with its dependencies:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '5000:5000'
    env_file:
      - .env
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:latest
    ports:
      - '27017:27017'

  redis:
    image: redis:latest
    ports:
      - '6379:6379'
```

To start the application with Docker Compose, use the following command:

```bash
docker-compose up --build
```

## Testing

To ensure the reliability and maintainability of the application, comprehensive unit tests are provided using Jest, a popular testing framework for Node.js applications.

### Running Unit Tests

To run the unit tests, use the following command:

```bash
npm run test
```

or

```bash
yarn test
```

### Unit Testing Strategy

Unit tests are designed to verify the functionality of individual units of code, in isolation from the rest of the application.

- **Jest Framework**: Jest is used for its simplicity and efficiency in testing JavaScript applications.
  
Unit testing helps identify bugs early in the development process, improves code quality, and facilitates easier maintenance and refactoring of code.

### Redis

redis used to cache projects depends on the current login user.

## Conclusion

TeamWork Hub is a robust platform designed to facilitate collaboration and project management. With its real-time features and comprehensive API, it provides a seamless experience for users. The use of Docker and Docker Compose further simplifies the setup and deployment process, while the testing framework ensures the application's reliability.
