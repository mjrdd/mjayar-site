<script lang="ts">
	import "inter-ui/inter.css";
	import "../theme.css";
	import "@skeletonlabs/skeleton/styles/all.css";
	import "../app.css";

	import { browser } from "$app/environment";
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";
	import { Modal, Toast, setInitialClassState, storePopup } from "@skeletonlabs/skeleton";

	if (browser) storePopup.set({ arrow, autoUpdate, computePosition, flip, offset, shift });
</script>

<svelte:head>
	{@html `<script nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<slot />
<Toast position="br" max={4} />
<Modal />
