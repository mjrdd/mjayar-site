<script lang="ts">
	import { onMount } from "svelte";
	import { Application } from "pixi.js";
	import { AnalogClock } from "$lib/pixiObjects";

	let backdrop: HTMLCanvasElement;

	onMount(() => {
		const app = new Application({
			view: backdrop,
			antialias: true,
			resizeTo: window,
			backgroundAlpha: 0
		});

		const clock = new AnalogClock();
		clock.position.x = 0.75 * window.innerWidth;
		clock.position.y = 0.75 * window.innerHeight;
		clock.metadata.radius = Math.min(window.innerWidth, window.innerHeight) * 0.4;
		clock.metadata.periodic = false;

		app.stage.addChild(clock);
		app.ticker.add(() => {
			clock.tick();
		});

		function handleResize() {
			clock.position.x = 0.75 * window.innerWidth;
			clock.position.y = 0.75 * window.innerHeight;
			clock.metadata.radius = Math.min(window.innerWidth, window.innerHeight) * 0.4;
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			app.destroy(false, { children: true });
		};
	});
</script>

<svelte:head>
	<title>mjayar</title>
	<meta name="description" content="Welcome to mjayar" />
</svelte:head>

<canvas bind:this={backdrop} class="fixed top-0 -z-10 h-full w-full opacity-60" />

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
