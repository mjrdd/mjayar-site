<script lang="ts">
	import "inter-ui/inter.css";
	import "../theme.css";
	import "@skeletonlabs/skeleton/styles/all.css";
	import "../app.css";

	import { Modal, Toast, storePopup } from "@skeletonlabs/skeleton";
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<slot />
<Toast position="br" />
<Modal />
