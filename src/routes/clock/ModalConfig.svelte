<script lang="ts">
	import { modalStore, SlideToggle } from "@skeletonlabs/skeleton";
</script>

<div class="bg-surface-50-900-token rounded-lg w-full max-w-2xl m-2 flex flex-col p-6">
	<span class="text-3xl my-4">Settings</span>
	<div class="">
		<div class="flex items-center justify-between my-4 border-y-2 py-4">
			<div>
				<span>24 Hour Format</span>
			</div>
			<div>
				<SlideToggle name="format-24" size="sm" />
			</div>
		</div>
	</div>
	<div class="flex justify-end gap-4">
		<button class="btn btn-sm variant-filled-surface" on:click={() => modalStore.close()}>
			Cancel
		</button>
		<button class="btn btn-sm variant-filled-primary">Save</button>
	</div>
</div>
