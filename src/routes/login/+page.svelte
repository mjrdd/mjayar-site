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
	import OAuth from "./OAuth.svelte";

	export let data;

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
		allErrors,
		enhance,
		errors,
		form: formStore,
		submitting
	} = superForm(data.loginWithPasswordForm);

	$: {
		if (browser) {
			const authErrors = $allErrors.find((err) => err.path == "_errors");
			if (authErrors) authErrors.messages.forEach(showErrorToast);
		}
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

	<div class="relative flex h-full flex-col items-center">
		<form
			action="?/loginWithPassword"
			method="post"
			use:enhance
			class="mt-6 w-full max-w-md p-4 sm:m-0">
			<div class="h2">Account Login</div>
			<div
				class="input-group input-group-divider mt-8 grid-cols-[auto_1fr_auto] !bg-transparent">
				<div class="input-group-shim">
					<Icon icon={biEnvelopeAt} />
				</div>
				<input
					type="text"
					name="emailOrUsername"
					placeholder="Email address or username"
					required
					aria-required="true"
					bind:value={$formStore.emailOrUsername} />
			</div>
			{#if $errors.emailOrUsername}
				<span class="text-sm text-red-600">{$errors.emailOrUsername[0]}</span>
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
					required
					aria-required="true" />
			</div>
			{#if $errors.password}
				<span class="text-sm text-red-600">{$errors.password}</span>
			{/if}

			<button type="submit" class="btn variant-filled-primary mt-6 w-full">
				<span class="font-extrabold uppercase">Login</span>
			</button>
		</form>

		<div class="inline-flex w-full items-center justify-center">
			<hr class="mx-6 my-8 h-px w-32 border-0 bg-gray-200 dark:bg-gray-700" />
			<span class="absolute left-1/2 -translate-x-1/2 bg-inherit px-3">or</span>
			<hr class="mx-6 my-8 h-px w-32 border-0 bg-gray-200 dark:bg-gray-700" />
		</div>

		<OAuth />

		{#if $submitting}
			<div
				class="fixed top-0 flex h-full w-full items-center justify-center bg-white !bg-opacity-80 dark:bg-black">
				<div><ProgressRadial value={undefined} /></div>
			</div>
		{/if}
	</div>
</AppShell>
