<script lang="ts">
	import { onMount } from "svelte";
	import { objectToStyleString } from "$lib/utils";
	import { page } from "$app/stores";

	$: params = Object.fromEntries($page.url.searchParams.entries());
	$: customFont = params.font?.replace(" ", "+");

	let now = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			now = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	$: minutes = now.getMinutes();
	$: hours = now.getHours();

	let width: number;
	let height: number;
</script>

<svelte:head>
	<title>Digital Clock</title>

	{#if customFont}
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
		<link
			href="https://fonts.googleapis.com/css2?family={customFont}&display=swap"
			rel="stylesheet" />
	{/if}
</svelte:head>

<div
	class="h-full flex flex-nowrap items-center justify-center select-none"
	style={objectToStyleString({
		fontSize: width / 4 + "px",
		fontFamily: params.font ? params.font : "inherit",
		backgroundColor: params.bg ? "#" + params.bg : "inherit"
	})}
	bind:clientWidth={width}
	bind:clientHeight={height}>
	<div
		class="grid grid-cols-2 place-items-center"
		style={objectToStyleString({ width: width / 2.5 + "px" })}>
		<div>{Math.floor(hours / 10)}</div>
		<div>{hours % 10}</div>
	</div>
	<span class="blink">:</span>
	<div
		class="grid grid-cols-2 place-items-center"
		style={objectToStyleString({ width: width / 2.5 + "px" })}>
		<div>{Math.floor(minutes / 10)}</div>
		<div>{minutes % 10}</div>
	</div>
</div>

<style>
	.blink {
		animation: kf-blink 1.5s step-end infinite;
	}

	@keyframes kf-blink {
		0%,
		100% {
			opacity: 1;
		}

		50% {
			opacity: 0;
		}
	}
</style>
