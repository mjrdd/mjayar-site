<script lang="ts">
	import "inter-ui/inter.css";
	import "../theme.css";
	import "@skeletonlabs/skeleton/styles/all.css";
	import "../app.css";

	import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
	import { Modal, Toast, storePopup } from "@skeletonlabs/skeleton";

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Modal />
<Toast />
<slot />
