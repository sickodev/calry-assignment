import { optimizeBookings} from "./optimize.ts"

let data: number[][] = [[9, 12], [11, 13], [14, 17], [16, 18]] 

console.log(optimizeBookings(data))

//Output: [[9, 13], [14, 18]]
