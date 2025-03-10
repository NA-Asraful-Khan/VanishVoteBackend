# VanishVote API

VanishVote API is a simple polling system that allows users to create polls, vote, comment, and react to polls. This API is built using Node.js, Express, and MongoDB.

## Features

- Create a poll with multiple options
- Vote on polls
- Add comments to polls
- React to polls with likes and trending reactions
- Polls expire after a specified duration
- Poll results can be hidden
- Private polls feature

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/NA-Asraful-Khan/VanishVoteBackend.git
   cd VanishVoteBackend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the MongoDB connection:
   ```sh
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:5000/`.

## API Endpoints

### Polls

#### Create a Poll

```http
POST /api/polls/
```

**Request Body:**

```json
{
  "question": "What is your favorite programming language?",
  "options": ["JavaScript", "Python", "Java"],
  "expiresIn": 24, // in hours
  "hideResults": false,
  "isPrivate": false
}
```

**Response:**

```json
{
  "_id": "pollId",
  "question": "What is your favorite programming language?",
  "options": [
    { "text": "JavaScript", "votes": 0 },
    { "text": "Python", "votes": 0 }
  ],
  "expiresAt": "2025-03-10T12:00:00.000Z",
  "hideResults": false,
  "isPrivate": false,
  "createdAt": "2025-03-09T12:00:00.000Z"
}
```

#### Get a Poll

```http
GET /api/polls/:id
```

**Response:**

```json
{
  "_id": "pollId",
  "question": "What is your favorite programming language?",
  "options": [
    { "text": "JavaScript", "votes": 10 },
    { "text": "Python", "votes": 5 }
  ],
  "expiresAt": "2025-03-10T12:00:00.000Z",
  "hideResults": false,
  "isPrivate": false,
  "comments": [],
  "reactions": { "likes": 0, "trending": 0 }
}
```

#### Vote on a Poll

```http
POST /api/polls/:id/vote
```

**Request Body:**

```json
{
  "optionIndex": 0
}
```

#### Add a Comment

```http
POST /api/polls/:id/comments
```

**Request Body:**

```json
{
  "text": "Great poll!"
}
```

#### Add a Reaction

```http
POST /api/polls/:id/reactions
```

**Request Body:**

```json
{
  "type": "likes"
}
```

## Deployment

To deploy, make sure you configure the `MONGODB_URI` in the `.env` file and use a cloud MongoDB service such as [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) if needed.
