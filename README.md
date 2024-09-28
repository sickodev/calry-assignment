# Readme

## Task 1: Optimize Bookings Function

### Overview
The `optimizeBookings` function merges overlapping time intervals in a list of bookings.

### Function Description
- **Input**: `bookings` - A 2D array with start and end times for each booking.
- **Output**: A 2D array of optimized bookings with merged intervals.

### How It Works
1. **Check for Empty Input**: Return empty array if input is empty.
2. **Sort Bookings**: Sort by start time.
3. **Merge Overlapping Intervals**: Iterate through bookings, merging overlapping intervals.
4. **Finalize**: Push the last booking into the answer array and return.

### Example Usage
```typescript
const bookings = [[1, 3], [2, 4], [5, 7], [6, 8]];
const optimizedBookings = optimizeBookings(bookings);
console.log(optimizedBookings); // Output: [[1, 4], [5, 8]]
```

### Best Practices
- **Input Validation**: Ensure valid time intervals.
- **Performance**: O(n log n) due to sorting.
- **Readability**: Clear code with descriptive names and comments.

## Task 2: NestJS Requests API

### Overview
A NestJS application providing a RESTful API for managing requests.

### Features
- Create, read, update, delete, and mark requests as complete.

### Installation
1. **Clone Repository**:
   ```bash
   git clone https://github.com/sickodev/calry-assignment
   cd calry-assignment/task-2
   ```
2. **Install Dependencies**:
   ```bash
   npm install || yarn install
   ```
3. **Run Application**:
   ```bash
   npm run start || yarn start
   ```

### API Endpoints
- **POST** `/requests`: Create a new request.
- **GET** `/requests`: Retrieve all requests.
- **GET** `/requests/:id`: Retrieve a specific request.
- **PUT** `/requests/:id`: Update an existing request.
- **DELETE** `/requests/:id`: Remove a request.
- **POST** `/requests/:id/complete`: Mark a request as complete.

### Testing
```bash
npm run test || yarn test
```

## General Tools and Practices

### Node.js and npm
- Use Node.js for running JavaScript on the server-side.
- Manage packages with npm or Yarn.

### NestJS
- Build robust, scalable server-side applications with NestJS.

### Documentation and Formatting
- Use Markdown for formatting documentation on GitHub.

## Conclusion
These tasks demonstrate efficient management of time intervals and request handling using modern JavaScript tools and frameworks. Ensure proper input validation, performance optimization, and clear documentation for maintainable code.