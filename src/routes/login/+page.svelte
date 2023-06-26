<script lang="ts">
	import { browser } from "$app/environment";
	import { superForm } from "sveltekit-superforms/client";

	import { toastStore } from "@skeletonlabs/skeleton";
	import type { ToastSettings } from "@skeletonlabs/skeleton";

	import Icon from "@iconify/svelte/offline";
	import biAsterisk from "@iconify-icons/bi/asterisk";
	import biEnvelopeAt from "@iconify-icons/bi/envelope-at";

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
		form: formData
	} = superForm(data.login_form, {
		onResult({ result, formEl }) {
			if (result.type === "failure" && result.data) {
				showErrorToast(result.data.message);
				formEl.reset();
			}
		}
	});

	if (browser && form?.message) {
		showErrorToast(form.message);
	}
</script>

<div class="flex h-screen items-center justify-center">
	<form method="POST" use:enhance class="m-4 w-full max-w-lg p-8">
		<div class="h2">Account Login</div>

		<div class="input-group input-group-divider mt-8 grid-cols-[auto_1fr_auto] !bg-transparent">
			<div class="input-group-shim">
				<Icon icon={biEnvelopeAt} />
			</div>
			<input
				type="text"
				name="email_or_username"
				placeholder="Email address or username"
				bind:value={$formData.email_or_username}
				{...$constraints.email_or_username} />
		</div>
		{#if $errors.email_or_username}
			<span class="text-sm text-red-600">{$errors.email_or_username}</span>
		{/if}

		<div class="input-group input-group-divider mt-6 grid-cols-[auto_1fr_auto] !bg-transparent">
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

		<button type="submit" class="btn variant-filled-primary mt-6 w-full">
			<span class="uppercase font-extrabold">Login</span>
		</button>
	</form>
</div>
