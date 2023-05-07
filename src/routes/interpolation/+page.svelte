<script lang="ts">
	import { round } from "$lib/utils";
	import Katex from "$lib/Katex.svelte";
	import SettingsModal from "./SettingsModal.svelte";
	import Icon from "@iconify/svelte/offline";
	import GearFill from "@iconify-icons/bi/gear-fill";
	import { modalStore } from "@skeletonlabs/skeleton";
	import type { ModalComponent, ModalSettings } from "@skeletonlabs/skeleton";

	let values: (number | null)[] = new Array(6).fill(null);
	let decimals = 5;

	function solve() {
		values[5] = null;
		if (values.indexOf(null) < 5) return;

		const [x1, y1, x2, y2, x] = values as number[];

		if (x1 === x2) return;

		values[5] = round(y2 + ((x - x1) * (y2 - y1)) / (x2 - x1), decimals);
	}

	function reset() {
		values = values.fill(null);
	}

	function showSettingsModal() {
		const modalComponent: ModalComponent = {
			ref: SettingsModal,
			props: { decimals }
		};

		const modalSetting: ModalSettings = {
			type: "component",
			component: modalComponent,
			response(data) {
				if (data) {
					decimals = data.decimals;
				}
			}
		};

		modalStore.trigger(modalSetting);
	}
</script>

<div class="container">
	<span class="my-8 block text-3xl">Linear Interpolate</span>

	<div class="my-4 flex justify-start">
		<Katex tex={"y = y_2 + \\frac{(x - x_1) (y_2 - y_1)}{x_2 - x_1}"} displayMode />
	</div>

	<div class="grid w-full max-w-lg grid-cols-2 gap-2">
		<input type="number" bind:value={values[0]} placeholder="x1" required />
		<input type="number" bind:value={values[1]} placeholder="y1" required />
		<input type="number" bind:value={values[2]} placeholder="x2" required />
		<input type="number" bind:value={values[3]} placeholder="y2" required />
		<input type="number" bind:value={values[4]} placeholder="x" required />
		<input type="number" bind:value={values[5]} placeholder="y" readonly />
	</div>

	<div class="my-4 flex gap-2">
		<button class="btn variant-filled-primary" on:click={solve}>Solve</button>
		<button class="btn variant-soft" on:click={reset}>Reset</button>
		<button class="btn variant-soft" on:click={showSettingsModal}>
			<Icon icon={GearFill} />
		</button>
	</div>
</div>
