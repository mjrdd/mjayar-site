<script lang="ts">
	import { modalStore, SlideToggle } from "@skeletonlabs/skeleton";

	export let format24 = false;
	export let showSeconds = false;
	export let backgroundColor = "#ffffff";
	export let color = "#000000";

	function save() {
		$modalStore[0].response?.({ format24, showSeconds, backgroundColor, color });
		modalStore.close();
	}
</script>

<div class="bg-surface-50-900-token rounded-lg w-full max-w-xl m-2 flex flex-col p-6">
	<span class="text-3xl my-4">Settings</span>
	<ul class="list mb-4">
		<li class="border-b justify-between">
			<span>24-hour format</span>
			<SlideToggle name="format24" size="sm" bind:checked={format24} />
		</li>
		<li class="border-b justify-between">
			<span>Show seconds</span>
			<SlideToggle name="showSeconds" size="sm" bind:checked={showSeconds} />
		</li>
		<li class="border-b justify-between">
			<span>Background color</span>
			<input type="color" name="bg-color" bind:value={backgroundColor} />
		</li>
		<li class="border-b justify-between">
			<span>Font color</span>
			<input type="color" name="font-color" bind:value={color} />
		</li>
	</ul>
	<div class="flex justify-end gap-4">
		<button class="btn btn-sm variant-filled-surface" on:click={() => modalStore.close()}>
			Cancel
		</button>
		<button class="btn btn-sm variant-filled-primary" on:click={save}>Save</button>
	</div>
</div>
