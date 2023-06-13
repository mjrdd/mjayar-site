<script lang="ts">
	import "inter-ui/inter.css";
	import "../theme.css";
	import "@skeletonlabs/skeleton/styles/all.css";
	import "../app.css";

	import { browser } from "$app/environment";
	import { Modal, Toast, storePopup } from "@skeletonlabs/skeleton";
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";

	if (browser) {
		storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	}
</script>

<slot />
<Toast position="br" max={4} />
<Modal />
