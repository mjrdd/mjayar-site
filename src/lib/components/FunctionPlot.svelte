<script lang="ts">
	import { afterUpdate } from "svelte";
	import { twClass } from "../utils";
	import type { FunctionPlotOptions } from "function-plot";

	export let element = "div";
	export let options: Omit<FunctionPlotOptions, "target"> = {};

	let className = "";
	export { className as class };

	let plotContainer: HTMLElement;

	afterUpdate(async () => {
		const functionPlot = (await import("function-plot")).default;
		functionPlot({ target: plotContainer, ...options });
	});
</script>

<svelte:element
	this={element}
	bind:this={plotContainer}
	class={twClass(
		"dark:[&_.x.axis_.tick_line]:stroke-white dark:[&_.x.origin]:stroke-white dark:[&_.y.axis_.tick_line]:stroke-white dark:[&_.y.origin]:stroke-white",
		className
	)}
	{...$$restProps} />
