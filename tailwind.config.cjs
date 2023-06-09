const defaultTheme = require("tailwindcss/defaultTheme");

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
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				md: "3rem",
				lg: "4rem",
				xl: "5rem"
			}
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px"
		},
		extend: {
			fontFamily: {
				mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono]
			}
		}
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/container-queries"),
		...require("@skeletonlabs/skeleton/tailwind/skeleton.cjs")()
	]
};
