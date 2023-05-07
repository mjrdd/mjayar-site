<script lang="ts">
	import katex, { type KatexOptions } from "katex";
	import "katex/dist/katex.css";

	export let tex = "";
	export let displayMode = false;

	const options: KatexOptions = {
		displayMode,
		throwOnError: false
	};

	$: katexString = katex.renderToString(tex, options);
</script>

{@html katexString}
