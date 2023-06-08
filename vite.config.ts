import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		esbuildOptions: {
			plugins: [NodeModulesPolyfillPlugin()]
		}
	}
});
