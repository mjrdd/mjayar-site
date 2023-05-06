<svelte:head>
	<title>mjayar</title>
	<meta name="description" content="Welcome to mjayar" />
</svelte:head>

<div class="grid h-full place-items-center">
	<div class="flex w-full select-none flex-nowrap justify-center">
		{#each "mjayar" as char}
			<div class="char">{char}</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.char {
		margin-inline: calc(1vw + 0.8rem);
		font-size: calc(4vw + 0.75rem);
	}
</style>
