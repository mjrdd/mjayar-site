<script lang="ts">
	import "@fontsource/chivo-mono";
	import "@fontsource/chivo-mono/variable.css";
	import { onMount } from "svelte";

	const timeOptions = {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	} satisfies Intl.DateTimeFormatOptions;

	let timeNow = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			timeNow = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="container my-6">
	<div class="@container/clock bg-surface-200-700-token rounded-lg">
		<div class="py-12 @lg/clock:py-16 @4xl/clock:py-24">
			<div class="font-bold text-3xl text-center @lg/clock:text-5xl @4xl/clock:text-7xl">
				<span class="font-chivomono">
					{new Intl.DateTimeFormat("en-US", timeOptions).format(timeNow)}
				</span>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.font-chivomono {
		font-family: "Chivo Mono", monospace;

		@supports (font-variation-settings: normal) {
			font-family: "Chivo MonoVariable", monospace;
		}
	}
</style>
