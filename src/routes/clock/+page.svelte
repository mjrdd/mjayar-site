<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import Digital from "$lib/components/clock/Digital.svelte";

	let timeNow = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			timeNow = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	$: params = Object.fromEntries($page.url.searchParams.entries());
</script>

{#if !!params.fullscreen}
	<Digital
		hours={timeNow.getHours()}
		minutes={timeNow.getMinutes()}
		background={params.background}
		font={params.font} />
{:else}
	<div class="container my-6">
		<div class="@container/clock bg-surface-200-700-token rounded-lg">
			<div class="py-12 @lg/clock:py-16 @4xl/clock:py-24">
				<div class="font-bold text-3xl text-center @lg/clock:text-5xl @4xl/clock:text-7xl">
					<Digital
						hours={timeNow.getHours()}
						minutes={timeNow.getMinutes()}
						background={params.background}
						font={params.font} />
				</div>
			</div>
		</div>
	</div>
{/if}
