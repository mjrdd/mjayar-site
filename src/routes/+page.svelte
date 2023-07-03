<script lang="ts">
	import FunctionPlot from "$lib/components/FunctionPlot.svelte";
	import { LightSwitch } from "@skeletonlabs/skeleton";
</script>

<svelte:head>
	<title>Welcome to mjayar!</title>
	<meta name="description" content="Welcome to mjayar's personal website" />
</svelte:head>

<div
	class="bg-gradient-to-br from-surface-200 from-10% to-surface-50 to-45% dark:from-surface-800 dark:to-surface-900">
	<header class="flex h-16 items-center justify-end px-8">
		<LightSwitch rounded="rounded-full" />
	</header>
	<div
		class="container grid h-[640px] w-full grid-cols-none grid-rows-2 md:grid-cols-2 md:grid-rows-none md:items-center">
		<div class="m-2 overflow-hidden">
			<FunctionPlot options={{ data: [{ fn: "x^2" }], disableZoom: true, grid: true }} />
		</div>
		<div class="mx-8 flex flex-col justify-center gap-8 md:mx-16">
			<h1 class="font-extrabold">Welcome to mjayar!</h1>
			<p class="font-extralight leading-loose">
				Discover a captivating world of creativity and innovation on my personal website,
				where I showcase a carefully curated collection of my extraordinary projects.
			</p>
		</div>
	</div>
</div>
