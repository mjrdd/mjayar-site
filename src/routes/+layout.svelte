<script lang="ts">
	import "inter-ui/inter.css";
	import "../theme.css";
	import "@skeletonlabs/skeleton/styles/all.css";
	import "../app.css";

	import { browser } from "$app/environment";
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
	import { Modal, Toast, setInitialClassState, storePopup } from "@skeletonlabs/skeleton";

	if (browser) {
		storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	}
</script>

<svelte:head>
	{@html `<script nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<slot />
<Toast position="br" max={4} />
<Modal />
