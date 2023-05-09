<script lang="ts">
	import { saveSettings } from "./handles";
	import type { ConfigStore } from "./store";

	export let data: ConfigStore;
	let decimals = data.decimals;
</script>

<div class="w-full max-w-md rounded-lg p-6 bg-surface-50-900-token">
	<span class="my-2 block text-2xl">Settings</span>

	<ul class="list my-4">
		<li class="flex justify-between">
			<span>Decimal places</span>
			<input type="number" class="w-full max-w-[10rem]" bind:value={decimals} />
		</li>
	</ul>

	<div class="flex justify-end gap-2">
		<button
			class="btn variant-filled-primary"
			on:click={() => saveSettings({ ...data, decimals })}>
			Save
		</button>
	</div>
</div>
