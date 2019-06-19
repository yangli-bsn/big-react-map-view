export default function CalcCluster(data) {
	let finalData = [];
	data.forEach((d, index) => {
		
	});
}

function calculateDistance(point1, point2) {
	let a = point1.lat - point2.lat;
	let b = point1.lng - point2.lng;

	let c = Math.sqrt( a*a + b*b );
	return c;
}