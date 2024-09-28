### Overview

The `optimizeBookings` function is designed to optimize a list of bookings by merging overlapping time intervals. This is particularly useful in scenarios where multiple bookings may overlap, and the goal is to consolidate them into non-overlapping segments.

### Function Description

#### `optimizeBookings(bookings: number[][]): number[][]`

- **Input**: `bookings` - A 2D array where each sub-array represents a booking with two elements: the start time and the end time of the booking.
- **Output**: A 2D array of optimized bookings where overlapping intervals are merged.

### How It Works

1. **Check for Empty Input**:
   - If the input `bookings` array is empty, the function returns the empty array immediately.

2. **Sort Bookings**:
   - The function sorts the `bookings` array based on the start time of each booking.

3. **Initialize Variables**:
   - An empty array `answer` is initialized to store the optimized bookings.
   - The first booking is set as the initial `prev` (previous) booking.

4. **Iterate Through Bookings**:
   - For each subsequent booking, check if its start time is less than or equal to the end time of the previous booking.
     - If it is, merge the bookings by updating the end time of the previous booking to the maximum of its current end time and the end time of the current booking.
     - If it is not, push the previous booking into the `answer` array and update `prev` to the current booking.

5. **Finalize**:
   - After the loop, push the last `prev` booking into the `answer` array.
   - Return the `answer` array containing the optimized bookings.

### Example Usage

Here is an example of how to use this function:

```typescript
const bookings = [
  [1, 3],
  [2, 4],
  [5, 7],
  [6, 8]
];

const optimizedBookings = optimizeBookings(bookings);
console.log(optimizedBookings); // Output: [[1, 4], [5, 8]]
```

### Main File Integration

The `main.ts` file can call this function to optimize bookings. Here is a simple example of how it might be integrated:

```typescript
// main.ts
import { optimizeBookings } from './optimizeBookings';

const bookings = [
  [1, 3],
  [2, 4],
  [5, 7],
  [6, 8]
];

const optimized = optimizeBookings(bookings);
console.log("Optimized Bookings:", optimized);
```

### Best Practices and Considerations

- **Input Validation**: Ensure that the input `bookings` array is properly formatted and contains valid time intervals.
- **Performance**: The function has a time complexity of O(n log n) due to the sorting step, making it efficient for large inputs.
- **Readability**: The code is structured to be clear and readable, with descriptive variable names and comments.

By using this `optimizeBookings` function, you can efficiently manage and consolidate time intervals, ensuring that your bookings are optimized and non-overlapping.