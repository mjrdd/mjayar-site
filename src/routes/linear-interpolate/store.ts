import { writable } from "svelte/store";

export const valueStore = writable<(number | null)[]>(new Array(6).fill(null));

export type ConfigStore = {
	decimals: number;
};

const DEFAULT_CONFIG: ConfigStore = {
	decimals: 5
};

export const configStore = writable<ConfigStore>(DEFAULT_CONFIG);
