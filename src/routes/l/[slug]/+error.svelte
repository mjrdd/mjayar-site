<script lang="ts">
	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>{$page.status} Error</title>
</svelte:head>

<div class="flex h-screen items-center justify-center">
	<div class="m-6 w-full max-w-lg text-center">
		<div class="mb-12 text-6xl font-bold sm:text-9xl">{$page.status}</div>
		<div class="mb-8">{$page.error?.message}</div>
		<a href="/" class="btn variant-filled-primary">Go Home</a>
	</div>
</div>
