import { get } from "svelte/store";
import { modalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
import { round } from "$lib/utils";
import { configStore, valueStore, type ConfigStore } from "./store";
import SettingsModal from "./SettingsModal.svelte";

export function solveLinearInterpolation() {
	const values = get(valueStore);
	const config = get(configStore);
	values[5] = null;

	if (values.indexOf(null) < 5) return;

	const [x1, y1, x2, y2, x] = values as number[];

	if (x1 === x2) return;

	const result = y2 + ((x - x1) * (y2 - y1)) / (x2 - x1);
	values[5] = round(result, config.decimals);
	valueStore.set(values);
}

export function resetFields() {
	valueStore.set(new Array(6).fill(null));
}

export function showSettingsModal() {
	const modalComponent: ModalComponent = {
		ref: SettingsModal,
		props: { data: get(configStore) }
	};

	const modalSetting: ModalSettings = {
		type: "component",
		component: modalComponent,
		response(data) {
			data && configStore.set(data);
		}
	};

	modalStore.trigger(modalSetting);
}

export function saveSettings(data: ConfigStore) {
	get(modalStore)[0].response?.(data);
	modalStore.close();
}
