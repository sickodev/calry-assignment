# NestJS Requests API

This is a simple NestJS application that provides a RESTful API for managing requests. The app runs on `localhost:8080` and allows users to create, read, update, delete, and complete requests.

## Features

- Create a new request
- Retrieve all requests
- Retrieve a specific request by ID
- Update an existing request
- Remove a request
- Mark a request as complete

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (package managers)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sickodev/calry-assignment
   cd calry-assignment/task-2
   ```

2. Install the dependencies:

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

3. Run the application:

   Using npm:
   ```bash
   npm run start
   ```

   Or using yarn:
   ```bash
   yarn start
   ```

4. The API will be running on `http://localhost:8080`.

## API Endpoints

### Create a Request

- **POST** `/requests`

**Request Body**:
```json
{
  "id": "string",
  "guestName": "string",
  "roomNumber": "number",
  "requestDetails": "string",
  "priority": "number",
  "status": "string"
}
```

**Response**:
```json
{
  "message": "Request added successfully",
  "data": { /* request object */ }
}
```

### Get All Requests

- **GET** `/requests`

**Response**:
```json
[
  {
    "id": "string",
    "guestName": "string",
    "roomNumber": "number",
    "requestDetails": "string",
    "priority": "number",
    "status": "string"
  },
]
```

### Get a Request by ID

- **GET** `/requests/:id`

**Response**:
```json
{
  "id": "string",
  "guestName": "string",
  "roomNumber": "number",
  "requestDetails": "string",
  "priority": "number",
  "status": "string"
}
```

### Update a Request

- **PUT** `/requests/:id`

**Request Body**:
```json
{
  "guestName": "string",
  "requestDetails": "string",
  "priority": "number",
  "status": "string"
}
```

**Response**:
```json
{
  "message": "Request updated successfully",
  "data": { /* updated request object */ }
}
```

### Remove a Request

- **DELETE** `/requests/:id`

**Response**:
```json
{
  "message": "Request with id {id} has been removed successfully"
}
```

### Mark a Request as Complete

- **POST** `/requests/:id/complete`

**Response**:
```json
{
  "message": "Request marked complete",
  "data": { /* completed request object */ }
}
```

## Testing

To run the tests for the application, use the following command:

Using npm:
```bash
npm run test
```

Or using yarn:
```bash
yarn test
```

## Acknowledgments

- [NestJS](https://nestjs.com/) for providing a powerful framework for building server-side applications.
- [TypeScript](https://www.typescriptlang.org/) for enhancing JavaScript with static types.
