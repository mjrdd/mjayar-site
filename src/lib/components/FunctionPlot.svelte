<script lang="ts">
	import { onMount } from "svelte";
	import { twClass } from "../utils";
	import type { FunctionPlotOptions } from "function-plot";

	export let className = "";

	export let element = "div";
	export let options: Omit<FunctionPlotOptions, "target"> = {};
	export { className as class };

	let target: HTMLElement;

	onMount(async () => {
		const functionPlot = (await import("function-plot")).default;
		functionPlot({ target, ...options });
	});
</script>

<svelte:element
	this={element}
	bind:this={target}
	class={twClass(
		"dark:[&_.x.axis_.tick_line]:stroke-white dark:[&_.x.origin]:stroke-white dark:[&_.y.axis_.tick_line]:stroke-white dark:[&_.y.origin]:stroke-white",
		className
	)}
	{...$$restProps} />
