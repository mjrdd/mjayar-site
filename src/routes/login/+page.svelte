<script lang="ts">
	import { browser } from "$app/environment";
	import { superForm } from "sveltekit-superforms/client";

	import { toastStore, ProgressRadial } from "@skeletonlabs/skeleton";
	import type { ToastSettings } from "@skeletonlabs/skeleton";

	import Icon from "@iconify/svelte/offline";
	import biAsterisk from "@iconify-icons/bi/asterisk";
	import biEnvelopeAt from "@iconify-icons/bi/envelope-at";

	export let data;
	export let form;
	let loading = false;

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
		form: formData
	} = superForm(data.loginForm, {
		onSubmit() {
			loading = true;
		},
		onResult({ result }) {
			if (result.type === "failure" && result.data) {
				showErrorToast(result.data.message);
			}
			loading = false;
		}
	});

	if (browser && form?.message) {
		showErrorToast(form.message);
	}
</script>

<div class="flex h-screen items-center justify-center">
	<form method="POST" use:enhance class="m-4 w-full max-w-lg p-8">
		<h2>Account Login</h2>

		<div class="input-group input-group-divider mt-8 grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">
				<Icon icon={biEnvelopeAt} />
			</div>
			<input
				type="text"
				name="emailOrUsername"
				placeholder="Email address or username"
				bind:value={$formData.emailOrUsername}
				{...$constraints.emailOrUsername} />
		</div>
		{#if $errors.emailOrUsername}
			<span class="text-sm text-red-600">{$errors.emailOrUsername}</span>
		{/if}

		<div class="input-group input-group-divider mt-8 grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">
				<Icon icon={biAsterisk} />
			</div>
			<input
				type="password"
				name="password"
				placeholder="Password"
				{...$constraints.password} />
		</div>
		{#if $errors.password}
			<span class="text-sm text-red-600">{$errors.password}</span>
		{/if}

		<button
			type="submit"
			disabled={loading}
			class="btn variant-filled-primary mt-8 w-full uppercase">
			Login
		</button>
	</form>
</div>
