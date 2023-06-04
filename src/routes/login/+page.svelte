<script lang="ts">
	import { browser } from "$app/environment";
	import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { superForm } from "sveltekit-superforms/client";

	export let data;
	export let form;

	const { constraints, errors, form: sForm } = superForm(data.form);

	if (browser && form?.message) {
		const toastSetting: ToastSettings = {
			message: form.message,
			autohide: true
		};

		toastStore.trigger(toastSetting);
	}
</script>

<div class="mx-auto my-12 max-w-sm rounded bg-white p-8 shadow">
	<div class="mb-8 text-center text-4xl">Login</div>
	<form method="POST">
		<input
			type="email"
			name="email"
			class="mt-4 w-full rounded border border-gray-300 px-4 py-3"
			placeholder="Email"
			bind:value={$sForm.email}
			{...$constraints.email}
			required />
		{#if $errors.email}<span class="text-sm text-red-600">{$errors.email}</span>{/if}

		<input
			type="password"
			name="password"
			class="mt-4 w-full rounded border border-gray-300 px-4 py-3"
			placeholder="Password"
			bind:value={$sForm.password}
			{...$constraints.password}
			required />
		{#if $errors.password}<span class="text-sm text-red-600">{$errors.password}</span>{/if}

		<button
			type="submit"
			class="my-4 w-full cursor-pointer rounded border-0 bg-gray-900 p-3 text-white hover:bg-gray-800">
			Login
		</button>
	</form>
</div>
