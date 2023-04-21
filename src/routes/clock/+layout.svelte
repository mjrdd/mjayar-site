<script lang="ts">
	import { page } from "$app/stores";
	import { AppBar, AppShell, LightSwitch } from "@skeletonlabs/skeleton";

	$: params = Object.fromEntries($page.url.searchParams.entries());
	$: customFont = params.font?.replace(" ", "+");
</script>

<svelte:head>
	{#if customFont}
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
		<link
			href="https://fonts.googleapis.com/css2?family={customFont}&display=swap"
			rel="stylesheet" />
	{/if}
</svelte:head>

{#if !!params.fullscreen}
	<AppShell>
		<slot />
	</AppShell>
{:else}
	<AppShell>
		<svelte:fragment slot="header">
			<AppBar regionRowMain="container">
				<svelte:fragment slot="lead">
					<span class="sr-only" />
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<LightSwitch />
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>

		<slot />
	</AppShell>
{/if}
