import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...input: ClassValue[]) {
	return twMerge(clsx(input));
}

export function assert<T>(value: T) {
	if (!value) throw new Error("Invalid value");
	return value;
}
