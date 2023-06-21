<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";

	import Icon from "@iconify/svelte/offline";
	import biArrowLeft from "@iconify-icons/bi/arrow-left";
	import biHouse from "@iconify-icons/bi/house";

	const ERROR_MESSAGES: Record<number, { name: string; message: string }> = {
		400: {
			name: "Bad Request",
			message:
				"Oops! Something went wrong with your request. Please double-check your input and try again."
		},
		401: {
			name: "Unauthorized",
			message:
				"Sorry, but you're not authorized to access this resource. Please check your credentials and try again."
		},
		403: {
			name: "Forbidden",
			message:
				"Access denied! You don't have permission to access this resource. Please contact the administrator for assistance."
		},
		404: {
			name: "Not Found",
			message:
				"Oops! The resource you're looking for cannot be found. Please verify the URL and try again."
		},
		500: {
			name: "Internal Server Error",
			message:
				"Yikes! Something went wrong on our end. Our team has been notified, and we're working to fix it. Please try again later."
		}
	};

	let name: string | undefined;
	let message: string | undefined;

	$: {
		let status = $page.status;

		if (ERROR_MESSAGES[status]) {
			let error = ERROR_MESSAGES[status];
			name = error.name;
			message = error.message;
		}
	}

	function goBack() {
		if (browser && window.history) {
			window.history.back();
		}
	}
</script>

<svelte:head>
	<title>{name ?? $page.status + " Error"}</title>
</svelte:head>

<div class="w-full h-screen flex justify-center items-center">
	<div class="m-6 w-full max-w-md">
		<h1 class="text-center">{name ?? $page.status}</h1>
		<p class="mt-4 text-center">{message ?? $page.error?.message ?? ""}</p>

		<div class="mt-8 flex flex-wrap gap-4 justify-center">
			<button type="button" on:click={goBack} class="btn variant-soft">
				<span><Icon icon={biArrowLeft} /></span>
				<span>Go Back</span>
			</button>
			<a href="/" class="btn variant-soft">
				<span><Icon icon={biHouse} /></span>
				<span>Home</span>
			</a>
		</div>
	</div>
</div>
