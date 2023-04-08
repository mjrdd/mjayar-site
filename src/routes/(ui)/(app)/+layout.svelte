<script lang="ts">
	import { AppBar, AppShell, LightSwitch } from "@skeletonlabs/skeleton";
</script>

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
