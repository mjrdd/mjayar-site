<script lang="ts">
	import { AppBar, AppShell, LightSwitch } from "@skeletonlabs/skeleton";
</script>

<svelte:head>
	<title>Welcome to mjayar!</title>
	<meta name="description" content="Welcome to mjayar's personal website" />
</svelte:head>

<AppShell
	class="bg-gradient-to-br from-surface-200 from-10% to-surface-50 to-45% dark:from-surface-800 dark:to-surface-900">
	<svelte:fragment slot="header">
		<AppBar background="bg-transparent">
			<svelte:fragment slot="lead">
				<div>
					<a href="/" class="uppercase font-extrabold">mjayar</a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div>
					<LightSwitch />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<div class="flex h-full justify-center items-center p-6 md:p-10">
		<div class="max-w-md text-center">
			<h1 class="font-extrabold mb-8 md:mb-12">Welcome to mjayar!</h1>
			<p class="font-extralight leading-loose">
				Discover a captivating world of creativity and innovation on my personal website,
				where I showcase a carefully curated collection of my extraordinary projects.
			</p>
		</div>
	</div>
</AppShell>
