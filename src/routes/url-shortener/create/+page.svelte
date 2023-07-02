<script lang="ts">
	import { browser } from "$app/environment";
	import { superForm } from "sveltekit-superforms/client";

	import { toastStore, type ToastSettings, ProgressRadial } from "@skeletonlabs/skeleton";

	import Icon from "@iconify/svelte/offline";
	import biKey from "@iconify-icons/bi/key";
	import biLink from "@iconify-icons/bi/link";

	export let data;
	export let form;

	function showErrorToast(message: string) {
		const toastSetting: ToastSettings = {
			message,
			timeout: 4000,
			autohide: true,
			hideDismiss: true
		};
		toastStore.trigger(toastSetting);
	}

	const {
		constraints,
		enhance,
		errors,
		form: create_form,
		submitting
	} = superForm(data.create_form, {
		onResult({ result }) {
			if (result.type === "failure" && result.data) {
				if (result.data.message) showErrorToast(result.data.message);
			}
		}
	});

	if (browser && form?.message) {
		showErrorToast(form.message);
	}
</script>

<div class="flex justify-center p-4">
	<form method="POST" use:enhance class="w-full max-w-lg p-8">
		<div class="h2">New URL</div>
		<div class="input-group input-group-divider mt-8 grid-cols-[auto_1fr_auto] !bg-transparent">
			<div class="input-group-shim">
				<Icon icon={biKey} />
			</div>
			<input
				type="text"
				name="key"
				placeholder="Key"
				bind:value={$create_form.key}
				{...$constraints.key} />
		</div>
		{#if $errors.key}
			<span class="text-sm text-red-600">{$errors.url}</span>
		{/if}

		<div class="input-group input-group-divider mt-6 grid-cols-[auto_1fr_auto] !bg-transparent">
			<div class="input-group-shim">
				<Icon icon={biLink} />
			</div>
			<input type="text" name="url" placeholder="URL" {...$constraints.url} />
		</div>
		{#if $errors.url}
			<span class="text-sm text-red-600">{$errors.url}</span>
		{/if}

		<button type="submit" class="btn variant-filled-primary mt-6 w-full">
			<span class="font-extrabold uppercase">Create</span>
		</button>
	</form>
</div>

{#if $submitting}
	<div
		class="fixed top-0 flex h-full w-full items-center justify-center bg-white !bg-opacity-80 dark:bg-black">
		<div><ProgressRadial value={undefined} /></div>
	</div>
{/if}
