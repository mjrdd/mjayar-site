import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function twClass(...input: ClassValue[]) {
	return twMerge(clsx(input));
}
