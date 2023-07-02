<script lang="ts">
	import "inter-ui/inter.css";
	import "../theme.css";
	import "@skeletonlabs/skeleton/styles/all.css";
	import "../app.css";

	import { browser } from "$app/environment";
	import { Modal, Toast, storePopup } from "@skeletonlabs/skeleton";
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";

	if (browser) {
		storePopup.set({ arrow, autoUpdate, computePosition, flip, offset, shift });
	}
</script>

<Modal />
<Toast />
<slot />
