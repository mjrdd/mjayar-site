<script lang="ts">
	import { onMount } from "svelte";
	import DigitalHtml from "./Digital_HTML.svelte";

	let timeNow = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			timeNow = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	export let data;
</script>

{#if data.params.fullscreen}
	<DigitalHtml hours={timeNow.getHours()} minutes={timeNow.getMinutes()} />
{:else}
	<div class="container my-6">
		<div class="@container/clock bg-surface-200-700-token rounded-lg">
			<div class="py-12 @lg/clock:py-16 @4xl/clock:py-24">
				<div class="font-bold text-3xl text-center @lg/clock:text-5xl @4xl/clock:text-7xl">
					<DigitalHtml hours={timeNow.getHours()} minutes={timeNow.getMinutes()} />
				</div>
			</div>
		</div>
	</div>
{/if}
