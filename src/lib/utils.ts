export function clamp(min: number, value: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function objectToStyleString(styles: Record<string, string | number>) {
	return Object.entries(styles)
		.map(([key, value]) => {
			return key.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase()) + ": " + value;
		})
		.join("; ");
}

export function shuffleArray<TElement>(array: TElement[]) {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}
