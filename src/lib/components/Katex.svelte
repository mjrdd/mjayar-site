<script lang="ts">
	import { afterUpdate } from "svelte";
	import katex, { type KatexOptions } from "katex";
	import "katex/dist/katex.css";

	let output: HTMLElement;
	let texInput: HTMLElement;

	export let element = "div";
	export let tex = "";
	export let options: KatexOptions = {};

	afterUpdate(() => {
		katex.render(texInput.textContent || tex, output, {
			throwOnError: false,
			...options
		});
	});
</script>

<span class="hidden" bind:this={texInput}><slot /></span>
<svelte:element this={element} bind:this={output} {...$$restProps} />
