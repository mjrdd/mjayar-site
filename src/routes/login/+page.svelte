<script lang="ts">
	import { browser } from "$app/environment";
	import { superForm } from "sveltekit-superforms/client";

	import type { ToastSettings } from "@skeletonlabs/skeleton";
	import { toastStore } from "@skeletonlabs/skeleton";

	export let data;
	export let form;

	function showErrorToast(message: string) {
		const toastSetting: ToastSettings = {
			message,
			timeout: 3000,
			autohide: true,
			background: "variant-filled-warning"
		};

		toastStore.trigger(toastSetting);
	}

	const {
		constraints,
		enhance,
		errors,
		form: formData
	} = superForm(data.form, {
		onResult({ result }) {
			if (result.type === "failure" && result.status === 500 && result.data) {
				showErrorToast(result.data.message);
			}
		}
	});

	if (browser && form?.message) {
		showErrorToast(form.message);
	}
</script>

<div class="mx-auto my-12 max-w-sm rounded bg-white p-8 shadow">
	<div class="mb-8 text-center text-4xl">Login</div>
	<form method="POST" use:enhance>
		<input
			type="email"
			name="email"
			class="mt-4 w-full rounded border border-gray-300 px-4 py-3"
			placeholder="Email"
			bind:value={$formData.email}
			{...$constraints.email}
			required />
		{#if $errors.email}<span class="text-sm text-red-600">{$errors.email}</span>{/if}

		<input
			type="password"
			name="password"
			class="mt-4 w-full rounded border border-gray-300 px-4 py-3"
			placeholder="Password"
			bind:value={$formData.password}
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
