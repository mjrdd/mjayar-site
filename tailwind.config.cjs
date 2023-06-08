/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		require("path").join(
			require.resolve("@skeletonlabs/skeleton"),
			"../**/*.{html,js,svelte,ts}"
		)
	],
	darkMode: "class",
	theme: {
		container: {
			center: true
		},
		extend: {}
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/container-queries"),
		...require("@skeletonlabs/skeleton/tailwind/skeleton.cjs")()
	]
};
