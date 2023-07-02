<script lang="ts">
	import { AppBar, AppShell } from "@skeletonlabs/skeleton";

	import Icon from "@iconify/svelte/offline";
	import biHeartFill from "@iconify-icons/bi/heart-fill";

	export let data;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">Admin Panel</svelte:fragment>
			<div class="text-center">&nbsp;</div>
			<svelte:fragment slot="trail">
				<form method="POST" action="/logout?redirectTo=/login">
					<button type="submit" class="btn variant-soft">Log out</button>
				</form>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<nav class="list-nav h-full bg-primary-100-800-token">
			<ul class="p-4">
				<li class="min-w-[250px]"><a href="/admin">dashboard</a></li>
				{#each data.collections as collection}
					<li class="min-w-[250px]">
						<a href="/admin/{collection.name}">{collection.name.replace("_", " ")}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
		<div class="m-8 text-center">
			<span>
				Made with <Icon icon={biHeartFill} class="inline text-red-600" /> with mjayar
			</span>
		</div>
	</svelte:fragment>
</AppShell>
