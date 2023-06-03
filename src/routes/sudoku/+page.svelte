<script lang="ts">
	import { onMount } from "svelte";
	import { Application } from "pixi.js";
	import { Sudoku } from "$lib/pixiObjects/Sudoku";

	let canvas: HTMLCanvasElement;
	let app: Application;
	let sudoku: Sudoku;

	onMount(() => {
		app = new Application({
			view: canvas,
			antialias: true,
			width: 600,
			height: 600,
			backgroundAlpha: 0
		});

		sudoku = new Sudoku({ width: app.renderer.width, height: app.renderer.height });
		app.stage.addChild(sudoku);

		return () => {
			app.destroy(false, { children: true });
		};
	});

	let a: HTMLAnchorElement;
	async function exportToImage() {
		if (!app) throw new Error("App not initialized!");

		a.download = Date.now() + ".jpg";
		a.href = await app.renderer.extract.base64(sudoku, "image/jpg", 1);
		a.click();
	}
</script>

<svelte:head>
	<title>Sudoku</title>
	<meta name="description" content="" />
</svelte:head>

<div class="container">
	<div class="my-12">
		<canvas bind:this={canvas} class="aspect-square w-full max-w-md" />
	</div>
	<div class="flex gap-4">
		<button class="btn variant-filled-primary">New Game</button>

		<a href="/" bind:this={a} class="hidden">** download link **</a>
		<button on:click={exportToImage} class="btn variant-filled-primary"> Download </button>
	</div>
</div>
