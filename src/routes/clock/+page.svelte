<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
	import { page } from "$app/stores";
	import { objectToStyleString } from "$lib/utils";
	import Icon from "@iconify/svelte/offline";
	import GearFill from "@iconify-icons/bi/gear-fill";
	import { modalStore } from "@skeletonlabs/skeleton";
	import type { ModalComponent, ModalSettings } from "@skeletonlabs/skeleton";
	import ModalConfig from "./ModalConfig.svelte";

	$: params = Object.fromEntries($page.url.searchParams.entries());
	$: customFont = params.font?.replace(" ", "+");

	let now = new Date();
	let isLoaded = false;

	onMount(() => {
		const interval = setInterval(() => {
			now = new Date();
		}, 1000);

		isLoaded = true;

		return () => {
			clearInterval(interval);
		};
	});

	function showModal() {
		const modalComponent: ModalComponent = {
			ref: ModalConfig
		};

		const modalSetting: ModalSettings = {
			type: "component",
			component: modalComponent
		};

		modalStore.trigger(modalSetting);
	}

	let showButton = false;
	let timeoutId: number | undefined;

	function handleMouseMove() {
		showButton = true;
		if (timeoutId) clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			showButton = false;
		}, 1000);
	}

	onDestroy(() => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}
	});

	$: minutes = now.getMinutes();
	$: hours = now.getHours();

	let width: number;
	let height: number;
</script>

<svelte:head>
	<title>Digital Clock</title>

	{#if customFont}
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
		<link
			href="https://fonts.googleapis.com/css2?family={customFont}&display=swap"
			rel="stylesheet" />
	{/if}
</svelte:head>

{#if !isLoaded}
	<div
		class="fixed inset-0 z-10 bg-surface-100-800-token"
		out:fade={{ delay: 250, duration: 500 }} />
{/if}

<div
	class="flex h-full select-none flex-nowrap items-center justify-center"
	style={objectToStyleString({
		fontSize: Math.min(width / 4, height - 100) + "px",
		fontFamily: params.font ? params.font : "inherit",
		backgroundColor: params.bg ? "#" + params.bg : "inherit",
		color: params.color ? "#" + params.color : "inherit"
	})}
	on:mousemove={handleMouseMove}
	bind:clientWidth={width}
	bind:clientHeight={height}>
	<div
		class="grid grid-cols-2 place-items-center"
		style={objectToStyleString({ width: width / 2.5 + "px" })}>
		<div>{Math.floor(hours / 10)}</div>
		<div>{hours % 10}</div>
	</div>
	<span class="blink">:</span>
	<div
		class="grid grid-cols-2 place-items-center"
		style={objectToStyleString({ width: width / 2.5 + "px" })}>
		<div>{Math.floor(minutes / 10)}</div>
		<div>{minutes % 10}</div>
	</div>
</div>

{#if showButton}
	<div class="fixed bottom-0 right-0 p-6" transition:fly={{ y: 50 }}>
		<button type="button" class="btn-icon variant-filled-surface" on:click={showModal}>
			<Icon icon={GearFill} />
		</button>
	</div>
{/if}

<style>
	.blink {
		animation: kf-blink 1.5s step-end infinite;
	}

	@keyframes kf-blink {
		0%,
		100% {
			opacity: 1;
		}

		50% {
			opacity: 0;
		}
	}
</style>
