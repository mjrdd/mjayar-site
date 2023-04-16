<script lang="ts">
	import { page } from "$app/stores";

	export let hours = 0;
	export let minutes = 0;

	let width: number;

	function clamp(min: number, value: number, max: number): number {
		return Math.min(Math.max(value, min), max);
	}
</script>

<div
	class="@container/clock-digital w-full h-full flex justify-center items-center"
	bind:clientWidth={width}
	style="background-color: {$page.data.params.background ?? 'transparent'}">
	<div
		class="grid grid-cols-5 w-full max-w-3xl mx-12"
		style="font-size: {clamp(10, width / 8, 100)}px; font-family: {$page.data.params.font ??
			'inherit'}">
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
