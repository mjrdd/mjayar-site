<script lang="ts">
	import type { FunctionPlotOptions } from "function-plot/dist/types";
	import { onMount } from "svelte";
	import { twClass } from "../utils";

	export let options: Omit<FunctionPlotOptions, "target"> = {};
	export let customClass = "";

	let container: HTMLElement;

	onMount(async () => {
		const functionPlot = (await import("function-plot")).default;
		functionPlot({ target: container, ...options });
	});
</script>

<div
	bind:this={container}
	class={twClass(
		"dark:[&_.x.axis_.tick_line]:stroke-white dark:[&_.y.axis_.tick_line]:stroke-white",
		customClass
	)} />
