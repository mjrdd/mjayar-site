<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";

	export let data;
	const { form, errors, constraints } = superForm(data.form);
</script>

<div class="mx-auto my-12 max-w-sm rounded bg-white p-8 shadow">
	<div class="mb-8 text-center text-4xl">Login</div>
	<form method="POST">
		<input
			type="email"
			name="email"
			class="mb-4 w-full rounded border border-gray-300 px-4 py-3"
			placeholder="Email"
			bind:value={$form.email}
			{...$constraints.email}
			required />
		{#if $errors.email}<span>{$errors.email}</span>{/if}

		<input
			type="password"
			name="password"
			class="mb-4 w-full rounded border border-gray-300 px-4 py-3"
			placeholder="Password"
			{...$constraints.password}
			required />
		{#if $errors.password}<span>{$errors.password}</span>{/if}

		<button
			type="submit"
			class="w-full cursor-pointer rounded border-0 bg-gray-900 p-3 text-white hover:bg-gray-800">
			Login
		</button>
	</form>
</div>
