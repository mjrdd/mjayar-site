import { Application } from "pixi.js";
import { Clock } from "$lib/Clock";

export function createBackdrop(canvas: HTMLCanvasElement) {
	let sizeX = window.innerWidth;
	let sizeY = window.innerHeight;

	const app = new Application({
		view: canvas,
		antialias: true,
		resizeTo: window,
		backgroundAlpha: 0
	});

	const clock = new Clock();
	clock.position.set(0.8 * sizeX, 0.8 * sizeY);
	clock.radius = Math.min(sizeX, sizeY) * 0.4;

	app.stage.addChild(clock.body);
	app.ticker.add(() => {
		clock.render();
	});

	function handleResize() {
		sizeX = window.innerWidth;
		sizeY = window.innerHeight;

		clock.position.set(0.8 * sizeX, 0.8 * sizeY);
		clock.radius = Math.min(sizeX, sizeY) * 0.4;
	}

	window.addEventListener("resize", handleResize);

	return () => {
		window.removeEventListener("resize", handleResize);
		app.destroy(false, { children: true });
	};
}
