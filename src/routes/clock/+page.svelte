<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	const timeOptions = {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	} satisfies Intl.DateTimeFormatOptions;

	let timeNow = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			timeNow = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	let customFont = $page.url.searchParams.get("font");
	$: googleCustomFont = customFont?.replace(" ", "+");
</script>

<svelte:head>
	{#if customFont}
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
		<link
			href="https://fonts.googleapis.com/css2?family={googleCustomFont}&display=swap"
			rel="stylesheet" />
	{/if}
</svelte:head>

<div class="container my-6">
	<div class="@container/clock bg-surface-200-700-token rounded-lg">
		<div class="py-12 @lg/clock:py-16 @4xl/clock:py-24">
			<div class="font-bold text-3xl text-center @lg/clock:text-5xl @4xl/clock:text-7xl">
				<span style="font-family: {customFont ?? 'inherit'};">
					{new Intl.DateTimeFormat("en-US", timeOptions).format(timeNow)}
				</span>
			</div>
		</div>
	</div>
</div>
