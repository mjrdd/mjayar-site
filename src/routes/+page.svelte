<script lang="ts">
	import { AppBar, AppShell, LightSwitch } from "@skeletonlabs/skeleton";
</script>

<svelte:head>
	<title>Welcome to mjayar!</title>
	<meta name="description" content="Welcome to mjayar's personal website" />
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-transparent">
			<svelte:fragment slot="lead">
				<div>
					<a href="/" class="font-extrabold uppercase">mjayar</a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div>
					<LightSwitch />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<div class="flex h-full items-center justify-center p-6 md:p-10">
		<div class="max-w-lg text-center">
			<h1 class="mb-8 font-extrabold md:mb-12">Welcome to mjayar!</h1>
			<p class="font-extralight leading-loose">
				Discover a captivating world of creativity and innovation on my personal website,
				where I showcase a carefully curated collection of my extraordinary projects.
			</p>
		</div>
	</div>
</AppShell>
