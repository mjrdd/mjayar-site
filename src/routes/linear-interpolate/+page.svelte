<script lang="ts">
	import Katex from "$lib/Katex.svelte";

	import Icon from "@iconify/svelte/offline";
	import GearFill from "@iconify-icons/bi/gear-fill";

	import { solveLinearInterpolation, resetFields, showSettingsModal } from "./handles";
	import { valueStore } from "./store";
</script>

<div class="container">
	<span class="my-8 block text-3xl">Linear Interpolate</span>

	<div class="my-4 flex justify-start">
		<Katex tex={"y = y_2 + \\frac{(x - x_1) (y_2 - y_1)}{x_2 - x_1}"} displayMode />
	</div>

	<div class="grid w-full max-w-lg grid-cols-2 gap-2">
		<input type="number" bind:value={$valueStore[0]} placeholder="x1" required />
		<input type="number" bind:value={$valueStore[1]} placeholder="y1" required />
		<input type="number" bind:value={$valueStore[2]} placeholder="x2" required />
		<input type="number" bind:value={$valueStore[3]} placeholder="y2" required />
		<input type="number" bind:value={$valueStore[4]} placeholder="x" required />
		<input type="number" bind:value={$valueStore[5]} placeholder="y" readonly />
	</div>

	<div class="my-4 flex gap-2">
		<button class="btn variant-filled-primary" on:click={solveLinearInterpolation}>
			Solve
		</button>
		<button class="btn variant-soft" on:click={resetFields}>Reset</button>
		<button class="btn variant-soft" on:click={showSettingsModal}>
			<Icon icon={GearFill} />
		</button>
	</div>
</div>
