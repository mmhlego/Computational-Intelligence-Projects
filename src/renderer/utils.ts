export default function shuffleArray(array: any[]) {
	console.log('shuffle');
	const result = array;
	for (let i = result.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return array;
}
