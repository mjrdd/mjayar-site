export function clamp(min: number, value: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function objectToStyleString(styles: Record<string, string>) {
	return Object.entries(styles)
		.map(([key, value]) => {
			const property = key.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase());
			return property + ": " + value;
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
