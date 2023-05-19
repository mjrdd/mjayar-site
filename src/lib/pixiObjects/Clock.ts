import { Container, Graphics, LINE_CAP } from "pixi.js";

export class AnalogClock extends Container {
	private graphics: Graphics;

	public metadata: {
		radius?: number;
		periodic?: boolean;
	};

	constructor() {
		super();

		this.graphics = new Graphics();
		this.addChild(this.graphics);

		this.metadata = {};
	}

	tick() {
		let { radius, periodic } = this.metadata;

		radius = radius ?? 0;
		periodic = periodic ?? true;

		this.graphics.clear();

		for (let i = 0; i < 12; i++) {
			const angle = (i / 6) * Math.PI;

			this.graphics
				.lineStyle(2, 0x030712, 1)
				.moveTo(0.9 * radius * Math.cos(angle), 0.9 * radius * Math.sin(angle))
				.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
		}

		const time = new Date();
		const milliseconds = time.getMilliseconds();
		const seconds = time.getSeconds();
		const minutes = time.getMinutes();
		const hours = time.getHours();

		const angleSeconds = (seconds + +!periodic * milliseconds * 0.001) * (Math.PI / 30);
		const angleMinutes = (minutes + (+!periodic * seconds) / 60) * (Math.PI / 30);
		const angleHours = hours * (Math.PI / 6) + minutes * (Math.PI / 360);

		this.graphics
			.lineStyle(8, 0x030712, 1)
			.moveTo(
				0.08 * radius * Math.cos(angleHours + Math.PI * 0.5),
				0.08 * radius * Math.sin(angleHours + Math.PI * 0.5)
			)
			.lineTo(
				0.5 * radius * Math.cos(angleHours - Math.PI * 0.5),
				0.5 * radius * Math.sin(angleHours - Math.PI * 0.5)
			).line.cap = LINE_CAP.ROUND;

		this.graphics
			.lineStyle(5, 0x030712, 1)
			.moveTo(
				0.1 * radius * Math.cos(angleMinutes + Math.PI * 0.5),
				0.1 * radius * Math.sin(angleMinutes + Math.PI * 0.5)
			)
			.lineTo(
				0.75 * radius * Math.cos(angleMinutes - Math.PI * 0.5),
				0.75 * radius * Math.sin(angleMinutes - Math.PI * 0.5)
			).line.cap = LINE_CAP.ROUND;

		this.graphics
			.lineStyle(2, 0xb91c1c, 1)
			.moveTo(
				0.15 * radius * Math.cos(angleSeconds + Math.PI * 0.5),
				0.15 * radius * Math.sin(angleSeconds + Math.PI * 0.5)
			)
			.lineTo(
				0.95 * radius * Math.cos(angleSeconds - Math.PI * 0.5),
				0.95 * radius * Math.sin(angleSeconds - Math.PI * 0.5)
			);
	}
}
