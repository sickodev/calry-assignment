export function optimizeBookings(bookings: number[][]):number[][]{
	if(bookings.length == 0){
		return bookings;
	}
	bookings.sort((a,b)=>a[0] - b[0]);
	const answer: number[][] = [];
	let prev: number[] = bookings[0];

	for(let i=1; i<bookings.length; i++){
		const booking = bookings[i];
		if(booking[0] <= prev[1]){
			prev[1] = Math.max(prev[1], booking[1]);
		}else{
			answer.push(prev);
			prev = booking;
		}
	}
	answer.push(prev);

	return answer;
}
