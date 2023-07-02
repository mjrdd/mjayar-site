<script lang="ts">
	import { browser } from "$app/environment";

	import Icon from "@iconify/svelte/offline";
	import biArrowLeft from "@iconify-icons/bi/arrow-left";
	import biHouse from "@iconify-icons/bi/house";

	export let status: number;
	export let name = "";
	export let message = "";

	function btnGoBack() {
		if (browser && window.history) {
			window.history.back();
		}
	}
</script>

<div class="flex h-screen w-full items-center justify-center">
	<div class="m-6 w-full max-w-xl">
		<h1 class="text-center">{name || status}</h1>
		<p class="mt-8 text-center">{message}</p>
		<div class="mt-12 flex flex-wrap justify-center gap-4">
			<button type="button" on:click={btnGoBack} class="btn variant-soft">
				<span><Icon icon={biArrowLeft} /></span>
				<span>Go Back</span>
			</button>
			<a href="/" class="btn variant-soft">
				<span><Icon icon={biHouse} /></span>
				<span>Home</span>
			</a>
		</div>
	</div>
</div>
