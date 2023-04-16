<script lang="ts">
	import { AppBar, AppShell, LightSwitch } from "@skeletonlabs/skeleton";

	export let data;

	$: customFont = data.params.font?.replace(" ", "+");
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

{#if data.params.fullscreen}
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
