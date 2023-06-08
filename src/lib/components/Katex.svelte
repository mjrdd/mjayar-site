<script lang="ts">
	import "katex/dist/katex.css";
	import katex from "katex";

	export let tex = "";
	export let displayMode = false;

	$: katexString = katex.renderToString(tex, {
		displayMode,
		throwOnError: false
	});
</script>

{@html katexString}
