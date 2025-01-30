Here's a sample `README.md` file for the backend of your project:

# Chat Application Backend

This is the backend for a chat application built using GraphQL, Node.js, TypeScript, and MongoDB. The backend includes user authentication, message handling, and real-time communication using GraphQL subscriptions.

## Features
- User Authentication: Users can sign up, log in, and authenticate using JWT.
- Messaging: Users can send messages to each other.
- Real-Time Messaging: Real-time message delivery using GraphQL subscriptions.
- Secure: Messages and user data are protected using JWT-based authentication.

## Technologies
- **Node.js**: JavaScript runtime for building the backend.
- **TypeScript**: For strong typing in JavaScript code.
- **GraphQL**: For building flexible and efficient APIs.
- **MongoDB**: NoSQL database for storing user data and messages.
- **GraphQL Subscriptions**: For real-time communication.
- **JWT (JSON Web Tokens)**: For secure user authentication.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Rajveer75way/chat-app.git
   cd chat-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file at the root of the project and add the following variables:

   ```env
   ACCESS_TOKEN_SECRET=your_jwt_secret_key
   MONGO_URI=mongodb://localhost:27017/chatapp
   ```

   - `ACCESS_TOKEN_SECRET` is used for signing and verifying JWT tokens.
   - `MONGO_URI` is the connection string for MongoDB.

4. Start the server:

   ```bash
   npm run development
   ```

   This will start the server in development mode.

## API Documentation

### Authentication

#### Sign Up

- **POST /api/auth/signup**

  Request body:
  ```json
  {
    "username": "user123",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

  Response:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login

- **POST /api/auth/login**

  Request body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

  Response:
  ```json
  {
    "token": "your_jwt_token_here"
  }
  ```

### Messages

#### Get Messages

- **GET /api/messages**

  Query Parameters:
  - `receiverId`: The ID of the user to fetch messages for.

  Example request:
  ```http
  GET /api/messages?receiverId=receiver_user_id
  ```

  Response:
  ```json
  [
    {
      "senderId": "sender_user_id",
      "receiverId": "receiver_user_id",
      "message": "Hello!",
      "timestamp": "2025-01-30T00:00:00Z"
    },
    ...
  ]
  ```

#### Send Message

- **POST /api/messages/send**

  Request body:
  ```json
  {
    "receiverId": "receiver_user_id",
    "message": "Hello, how are you?"
  }
  ```

  Response:
  ```json
  {
    "message": "Message sent successfully"
  }
  ```

### GraphQL API

The GraphQL API is available at the `/graphql` endpoint. You can use it for the following queries and mutations:

#### Query: Get Messages

```graphql
query GetMessages($receiverId: String!) {
  getMessages(receiverId: $receiverId) {
    senderId
    receiverId
    message
    timestamp
  }
}
```

#### Mutation: Send Message

```graphql
mutation SendMessage($messageData: MessageDTO!) {
  sendMessage(messageData: $messageData) {
    senderId
    receiverId
    message
    timestamp
  }
}
```

#### Subscription: Message Sent

```graphql
subscription OnMessageSent($receiverId: String!) {
  messageSent(receiverId: $receiverId) {
    messageSent {
      senderId
      receiverId
      message
      timestamp
    }
    receiverId
  }
}


## Development

For development purposes, use the following commands:

- **Run the server in development mode**:
  ```bash
  npm run dev
  ```

- **Build the TypeScript code**:
  ```bash
  npm run build
  ```

- **Run tests** (if applicable):
  ```bash
  npm run test
  ```

## License

This project is licensed under the MIT License.


Feel free to modify this README as needed for your project!
```

This `README.md` provides a good overview of the backend setup, API documentation, and development instructions for your chat application project. Adjust it as necessary based on your actual project structure and requirements.
