import { Graphics, LINE_CAP, Point } from "pixi.js";

export class Clock {
	public position: Point;
	public radius: number;
	public body: Graphics;

	constructor() {
		this.position = new Point();
		this.radius = 0;

		this.body = new Graphics();
	}

	render() {
		const position = this.position;
		const radius = this.radius;
		const ctx = this.body;

		ctx.clear();
		ctx.lineStyle(2, 0x454545, 1);

		for (let i = 0; i < 12; i++) {
			ctx.moveTo(
				position.x + 0.9 * radius * Math.cos(Math.PI * (i / 6)),
				position.y + 0.9 * radius * Math.sin(Math.PI * (i / 6))
			);
			ctx.lineTo(
				position.x + radius * Math.cos(Math.PI * (i / 6)),
				position.y + radius * Math.sin(Math.PI * (i / 6))
			);
		}

		const time = new Date();
		const sec = time.getSeconds();
		const min = time.getMinutes();
		const hrs = time.getHours();

		// HOURS
		ctx.lineStyle(8, 0x222222, 1);
		ctx.moveTo(
			position.x + 0.08 * radius * Math.cos((Math.PI / 360) * (60 * hrs + min + 180)),
			position.y + 0.08 * radius * Math.sin((Math.PI / 360) * (60 * hrs + min + 180))
		);
		ctx.lineTo(
			position.x + 0.5 * radius * Math.cos((Math.PI / 360) * (60 * hrs + min - 180)),
			position.y + 0.5 * radius * Math.sin((Math.PI / 360) * (60 * hrs + min - 180))
		).line.cap = LINE_CAP.ROUND;

		// MINUTES
		ctx.lineStyle(5, 0x222222, 1);
		ctx.moveTo(
			position.x + 0.1 * radius * Math.cos(0.5 * Math.PI * (min / 15 - 3)),
			position.y + 0.1 * radius * Math.sin(0.5 * Math.PI * (min / 15 - 3))
		);
		ctx.lineTo(
			position.x + 0.75 * radius * Math.cos(0.5 * Math.PI * (min / 15 - 1)),
			position.y + 0.75 * radius * Math.sin(0.5 * Math.PI * (min / 15 - 1))
		).line.cap = LINE_CAP.ROUND;

		// SECONDS
		ctx.lineStyle(2, 0xff2125, 1);
		ctx.moveTo(
			position.x + 0.15 * radius * Math.cos(0.5 * Math.PI * (sec / 15 - 3)),
			position.y + 0.15 * radius * Math.sin(0.5 * Math.PI * (sec / 15 - 3))
		);
		ctx.lineTo(
			position.x + 0.95 * radius * Math.cos(0.5 * Math.PI * (sec / 15 - 1)),
			position.y + 0.95 * radius * Math.sin(0.5 * Math.PI * (sec / 15 - 1))
		);
	}
}
