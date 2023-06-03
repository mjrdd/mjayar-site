import { Container, Graphics, LINE_CAP } from "pixi.js";

export type ClockConfig = {
	radius: number;
	step: "seconds" | "milliseconds";
};

export type ClockComponents = {
	graphics: Graphics;
};

export class AnalogClock extends Container {
	public components: ClockComponents;
	public config: ClockConfig;

	constructor(config?: Partial<ClockConfig>) {
		super();

		const DEFAULT_CONFIG: ClockConfig = {
			radius: 100,
			step: "milliseconds"
		};

		this.config = Object.assign({}, DEFAULT_CONFIG, config);

		this.components = {} as ClockComponents;
		this.components.graphics = new Graphics();

		this.addChild(...Object.values(this.components));
	}

	tick() {
		const { radius, step } = this.config;
		const { graphics } = this.components;

		for (let i = 0; i < 12; i++) {
			const angle = (i / 6) * Math.PI;
			const x = radius * Math.cos(angle);
			const y = radius * Math.sin(angle);

			graphics
				.lineStyle(2, 0x030712, 1)
				.moveTo(x * 0.9, y * 0.9)
				.lineTo(x, y);
		}

		const time = new Date();
		const milliseconds = time.getMilliseconds();
		const seconds = time.getSeconds();
		const minutes = time.getMinutes();
		const hours = time.getHours();

		const angleSeconds =
			(seconds + (+(step === "milliseconds") * milliseconds) / 1000) * (Math.PI / 30);
		const angleMinutes = (minutes + seconds / 60) * (Math.PI / 30);
		const angleHours = hours * (Math.PI / 6) + minutes * (Math.PI / 360);

		graphics
			.lineStyle(8, 0x030712, 1)
			.moveTo(
				0.08 * radius * Math.cos(angleHours + Math.PI * 0.5),
				0.08 * radius * Math.sin(angleHours + Math.PI * 0.5)
			)
			.lineTo(
				0.5 * radius * Math.cos(angleHours - Math.PI * 0.5),
				0.5 * radius * Math.sin(angleHours - Math.PI * 0.5)
			).line.cap = LINE_CAP.ROUND;

		graphics
			.lineStyle(5, 0x030712, 1)
			.moveTo(
				0.1 * radius * Math.cos(angleMinutes + Math.PI * 0.5),
				0.1 * radius * Math.sin(angleMinutes + Math.PI * 0.5)
			)
			.lineTo(
				0.75 * radius * Math.cos(angleMinutes - Math.PI * 0.5),
				0.75 * radius * Math.sin(angleMinutes - Math.PI * 0.5)
			).line.cap = LINE_CAP.ROUND;

		graphics
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
