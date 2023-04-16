export function clamp(min: number, value: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

export function mapObject<TObject extends object, TValue>(
	obj: TObject,
	mapper: (value: TObject[keyof TObject], key: keyof TObject) => TValue
): { [TKey in keyof TObject]: TValue } {
	const mappedObject = {} as { [TKey in keyof TObject]: TValue };
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			mappedObject[key] = mapper(obj[key], key);
		}
	}
	return mappedObject;
}

export function shuffleArray<TElement>(array: TElement[]): TElement[] {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

export function stringFallback(value: string | null | undefined, fallback: string) {
	return !value || value === "" ? fallback : value;
}
