import { Graphics, LINE_CAP, Point } from "pixi.js";

export class Clock {
	public position: Point;
	public radius: number;
	public smooth: boolean;
	public body: Graphics;

	constructor() {
		this.position = new Point();
		this.radius = 0;
		this.smooth = true;

		this.body = new Graphics();
	}

	render() {
		const position = this.position;
		const radius = this.radius;
		const ctx = this.body;

		ctx.clear();
		ctx.lineStyle(2, 0x030712, 1);

		for (let i = 0; i < 12; i++) {
			const angle = (i / 6) * Math.PI;

			ctx.moveTo(
				position.x + 0.9 * radius * Math.cos(angle),
				position.y + 0.9 * radius * Math.sin(angle)
			);
			ctx.lineTo(
				position.x + radius * Math.cos(angle),
				position.y + radius * Math.sin(angle)
			);
		}

		const time = new Date();
		const milliseconds = time.getMilliseconds();
		const seconds = time.getSeconds();
		const minutes = time.getMinutes();
		const hours = time.getHours();

		const angleSeconds = (seconds + +this.smooth * milliseconds * 0.001) * (Math.PI / 30);
		const angleMinutes = (minutes + (+this.smooth * seconds) / 60) * (Math.PI / 30);
		const angleHours = hours * (Math.PI / 6) + minutes * (Math.PI / 360);

		ctx
			.lineStyle(8, 0x030712, 1)
			.moveTo(
				position.x + 0.08 * radius * Math.cos(angleHours + Math.PI * 0.5),
				position.y + 0.08 * radius * Math.sin(angleHours + Math.PI * 0.5)
			)
			.lineTo(
				position.x + 0.5 * radius * Math.cos(angleHours - Math.PI * 0.5),
				position.y + 0.5 * radius * Math.sin(angleHours - Math.PI * 0.5)
			).line.cap = LINE_CAP.ROUND;

		ctx
			.lineStyle(5, 0x030712, 1)
			.moveTo(
				position.x + 0.1 * radius * Math.cos(angleMinutes + Math.PI * 0.5),
				position.y + 0.1 * radius * Math.sin(angleMinutes + Math.PI * 0.5)
			)
			.lineTo(
				position.x + 0.75 * radius * Math.cos(angleMinutes - Math.PI * 0.5),
				position.y + 0.75 * radius * Math.sin(angleMinutes - Math.PI * 0.5)
			).line.cap = LINE_CAP.ROUND;

		ctx.lineStyle(2, 0xb91c1c, 1)
			.moveTo(
				position.x + 0.15 * radius * Math.cos(angleSeconds + Math.PI * 0.5),
				position.y + 0.15 * radius * Math.sin(angleSeconds + Math.PI * 0.5)
			)
			.lineTo(
				position.x + 0.95 * radius * Math.cos(angleSeconds - Math.PI * 0.5),
				position.y + 0.95 * radius * Math.sin(angleSeconds - Math.PI * 0.5)
			);
	}
}
