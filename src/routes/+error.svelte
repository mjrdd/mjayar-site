<script lang="ts">
	import { page } from "$app/stores";
	import { HTTP_ERROR } from "$lib/http-errors";
	import ErrorShell from "$lib/components/ErrorShell.svelte";

	$: err = Object.values(HTTP_ERROR).filter((value) => value.status === $page.status)[0];
</script>

<svelte:head>
	<title>{err.name || err.status + " Error"}</title>
</svelte:head>

<ErrorShell status={err.status} name={err.name} message={err.message} />
