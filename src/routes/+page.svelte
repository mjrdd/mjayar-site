<script lang="ts">
	import { onMount } from "svelte";
	import { createBackdrop } from "./backdrop";

	let backdrop: HTMLCanvasElement;

	onMount(() => {
		const removeBackdrop = createBackdrop(backdrop);

		return () => {
			removeBackdrop();
		};
	});
</script>

<svelte:head>
	<title>mjayar</title>
	<meta name="description" content="Welcome to mjayar" />
</svelte:head>

<canvas bind:this={backdrop} class="fixed top-0 -z-10 h-full w-full opacity-10" />

<div class="grid h-full place-items-center">
	<div class="flex w-full select-none flex-nowrap justify-center">
		{#each "mjayar" as char}
			<div class="char">{char}</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.char {
		margin-inline: calc(1vw + 0.8rem);
		font-size: calc(4vw + 0.75rem);
	}
</style>
