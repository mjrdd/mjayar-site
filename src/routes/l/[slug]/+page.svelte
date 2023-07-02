<script lang="ts">
	import ErrorShell from "$lib/components/ErrorShell.svelte";
	export let data;
</script>

<svelte:head>
	<title>{data.error.name}</title>
</svelte:head>

<ErrorShell status={data.error.status} message={data.error.message} />
