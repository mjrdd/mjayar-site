<script lang="ts">
	import { afterUpdate } from "svelte";
	import katex from "katex";
	import "katex/dist/katex.css";

	let renderElement: HTMLElement;
	let texElement: HTMLElement;

	export let element = "div";
	export let tex = "";
	export let displayMode = false;

	afterUpdate(() => {
		katex.render(tex || texElement.textContent || "", renderElement, {
			displayMode,
			throwOnError: false
		});
	});
</script>

<span class="hidden" bind:this={texElement}><slot /></span>
<svelte:element this={element} bind:this={renderElement} {...$$restProps} />
