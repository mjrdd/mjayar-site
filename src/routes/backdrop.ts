import { Application, Graphics, Point } from "pixi.js";

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

	type ClockConfig = {
		position: Point;
		radius: number;
	};

	const clock: ClockConfig = {
		position: new Point(centerX, centerY),
		radius: Math.min(sizeX, sizeY) * 0.4
	};

	const ctx = new Graphics();

	function drawClock() {
		ctx.lineStyle(2, 0x020202, 1);

		for (let i = 0; i < 12; i++) {
			ctx.moveTo(
				clock.position.x + 0.9 * clock.radius * Math.cos(Math.PI * (i / 6)),
				clock.position.y + 0.9 * clock.radius * Math.sin(Math.PI * (i / 6))
			);
			ctx.lineTo(
				clock.position.x + clock.radius * Math.cos(Math.PI * (i / 6)),
				clock.position.y + clock.radius * Math.sin(Math.PI * (i / 6))
			);
		}

		const time = new Date();
		const sec = time.getSeconds();
		const min = time.getMinutes();
		const hrs = time.getHours();

		ctx.lineStyle(5, 0x222222, 1);
		ctx.moveTo(clock.position.x, clock.position.y);
		ctx.lineTo(
			clock.position.x + 0.5 * clock.radius * Math.cos(Math.PI * (hrs / 6) - Math.PI * 0.5),
			clock.position.y + 0.5 * clock.radius * Math.sin(Math.PI * (hrs / 6) - Math.PI * 0.5)
		);

		ctx.lineStyle(3, 0x222222, 1);
		ctx.moveTo(clock.position.x, clock.position.y);
		ctx.lineTo(
			clock.position.x + 0.75 * clock.radius * Math.cos(Math.PI * (min / 30) - Math.PI * 0.5),
			clock.position.y + 0.75 * clock.radius * Math.sin(Math.PI * (min / 30) - Math.PI * 0.5)
		);

		ctx.lineStyle(2, 0xff2125, 1);
		ctx.moveTo(clock.position.x, clock.position.y);
		ctx.lineTo(
			clock.position.x + 0.75 * clock.radius * Math.cos(Math.PI * (sec / 30) - Math.PI * 0.5),
			clock.position.y + 0.75 * clock.radius * Math.sin(Math.PI * (sec / 30) - Math.PI * 0.5)
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

		clock.position.set(centerX, centerY);
		clock.radius = Math.min(sizeX, sizeY) * 0.4;

		ctx.clear();
		drawClock();
	}

	window.addEventListener("resize", handleResize);

	return () => {
		window.removeEventListener("resize", handleResize);
		app.destroy(false, { children: true });
	};
}
