export async function load({ url }) {
	return {
		params: {
			background: url.searchParams.get("bg"),
			font: url.searchParams.get("font"),
			fullscreen: !!url.searchParams.get("fullscreen")
		}
	};
}
