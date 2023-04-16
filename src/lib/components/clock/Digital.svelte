<script lang="ts">
	import { clamp, stringFallback } from "$lib/utils";

	export let hours = 0;
	export let minutes = 0;

	export let background: string | null | undefined;
	export let font: string | null | undefined;

	let width: number;
	$: size = clamp(10, width / 8, 100);
</script>

<div
	class="@container/clock-digital w-full h-full flex justify-center items-center"
	bind:clientWidth={width}
	style="background-color: {stringFallback(background, 'transparent')}">
	<div
		class="grid grid-cols-5 w-full max-w-3xl mx-12"
		style="font-size: {size}px; font-family: {stringFallback(font, 'inherit')}">
		<div class="flex justify-center items-center">{Math.floor(hours / 10)}</div>
		<div class="flex justify-center items-center">{hours % 10}</div>
		<div class="flex justify-center items-center anim-blink">:</div>
		<div class="flex justify-center items-center">{Math.floor(minutes / 10)}</div>
		<div class="flex justify-center items-center">{minutes % 10}</div>
	</div>
</div>

<style>
	.anim-blink {
		animation: blink 1s step-start infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
</style>
