import { Application, Graphics } from "pixi.js";

export function createBackdrop(canvas: HTMLCanvasElement) {
	let sizeX = window.innerWidth;
	let sizeY = window.innerHeight;

	let centerX = sizeX / 2;
	let centerY = sizeY / 2;

	const app = new Application({
		view: canvas,
		antialias: true,
		resizeTo: window,
		backgroundAlpha: 0
	});

	const ctx = new Graphics();

	function drawClock() {
		const radius = (Math.min(sizeX, sizeY) * 0.8) / 2;
		ctx.lineStyle(2, 0x020202, 1);

		for (let i = 0; i < 12; i++) {
			ctx.moveTo(
				centerX + (radius - 30) * Math.cos(2 * Math.PI * (i / 12)),
				centerY + (radius - 30) * Math.sin(2 * Math.PI * (i / 12))
			);
			ctx.lineTo(
				centerX + radius * Math.cos(2 * Math.PI * (i / 12)),
				centerY + radius * Math.sin(2 * Math.PI * (i / 12))
			);
		}

		const time = new Date();
		const sec = time.getSeconds();
		const min = time.getMinutes();
		const hrs = time.getHours();

		const rad = Math.PI / 30;

		ctx.lineStyle(5, 0x222222, 1);
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(
			centerX + radius * 0.5 * Math.cos(rad * hrs),
			centerY + radius * 0.5 * Math.sin(rad * hrs)
		);

		ctx.lineStyle(3, 0x222222, 1);
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(
			centerX + radius * 0.75 * Math.cos(rad * min),
			centerY + radius * 0.75 * Math.sin(rad * min)
		);

		ctx.lineStyle(2, 0xff2125, 1);
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(
			centerX + radius * 0.75 * Math.cos(rad * sec),
			centerY + radius * 0.75 * Math.sin(rad * sec)
		);
	}

	drawClock();

	app.stage.addChild(ctx);
	app.ticker.add(() => {
		ctx.clear();
		drawClock();
	});

	function handleResize() {
		sizeX = window.innerWidth;
		sizeY = window.innerHeight;

		centerX = sizeX / 2;
		centerY = sizeY / 2;

		ctx.clear();
		drawClock();
	}

	window.addEventListener("resize", handleResize);

	return () => {
		window.removeEventListener("resize", handleResize);
		app.destroy(false, { children: true });
	};
}
