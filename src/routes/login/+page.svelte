<script lang="ts">
	import { browser } from "$app/environment";
	import { superForm } from "sveltekit-superforms/client";

	import {
		AppShell,
		AppBar,
		LightSwitch,
		ProgressRadial,
		toastStore,
		type ToastSettings
	} from "@skeletonlabs/skeleton";

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
		form: login_form,
		submitting
	} = superForm(data.login_form, {
		onResult({ result, formEl }) {
			if (result.type === "failure" && result.data) {
				if (result.data.message) showErrorToast(result.data.message);
				formEl.reset();
			}
		}
	});

	if (browser && form?.message) {
		showErrorToast(form.message);
	}
</script>

<svelte:head>
	<title>Login to mjayar</title>
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

	<div class="relative flex h-full justify-center sm:items-center">
		<form method="POST" use:enhance class="mt-6 w-full max-w-md p-4 sm:m-0">
			<div class="h2">Account Login</div>
			<div
				class="input-group input-group-divider mt-8 grid-cols-[auto_1fr_auto] !bg-transparent">
				<div class="input-group-shim">
					<Icon icon={biEnvelopeAt} />
				</div>
				<input
					type="text"
					name="email_or_username"
					placeholder="Email address or username"
					bind:value={$login_form.email_or_username}
					{...$constraints.email_or_username} />
			</div>
			{#if $errors.email_or_username}
				<span class="text-sm text-red-600">{$errors.email_or_username}</span>
			{/if}

			<div
				class="input-group input-group-divider mt-6 grid-cols-[auto_1fr_auto] !bg-transparent">
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
				<span class="font-extrabold uppercase">Login</span>
			</button>
		</form>

		{#if $submitting}
			<div
				class="fixed top-0 flex h-full w-full items-center justify-center bg-white !bg-opacity-80 dark:bg-black">
				<div><ProgressRadial value={undefined} /></div>
			</div>
		{/if}
	</div>
</AppShell>
