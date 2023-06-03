import { Color, Container, Graphics } from "pixi.js";

export type SudokuConfig = {
	width: number;
	height: number;
};

export type SudokuComponents = {
	hints: Container;
	notes: Container;
	graphics: Graphics;
};

export class Sudoku extends Container {
	public components: SudokuComponents;
	public config: SudokuConfig;
	public hints: Map<string, number>;
	public notes: Map<string, Set<number> | number>;

	constructor(config?: Partial<SudokuConfig>) {
		super();

		const DEFAULT_CONFIG: SudokuConfig = {
			width: 900,
			height: 900
		};

		this.config = Object.assign({}, DEFAULT_CONFIG, config);

		this.components = {} as SudokuComponents;
		this.components.hints = new Container();
		this.components.notes = new Container();
		this.components.graphics = new Graphics();

		this.addChild(...Object.values(this.components));

		this.hints = new Map();
		this.notes = new Map();

		this.drawGridlines();
	}

	write(row: number, col: number, value: number, temp?: boolean) {
		const key = "r" + row + "c" + col;
		const store = this.notes.get("key");

		if (!store) {
			let newStore: Set<number> | number;

			if (temp) {
				newStore = new Set();
				newStore.add(value);
			} else {
				newStore = value;
			}

			this.notes.set(key, newStore);
			return;
		}

		if (typeof store === "number") {
			this.notes.set(key, value);
		} else {
			store.add(value);
		}
	}

	private drawGridlines() {
		const ctx = this.components.graphics;
		const backdropColor = new Color("#ffffff");
		const majorLineColor = new Color("#393939");
		const minorLineColor = new Color("#cfcfcf");

		const x = this.config.width;
		const y = this.config.height;

		ctx.clear();
		ctx.beginFill(backdropColor).drawRect(0, 0, x, y);

		ctx.lineStyle(2, minorLineColor, 1)
			.moveTo((x / 9) * 1, 0)
			.lineTo((x / 9) * 1, y)
			.moveTo((x / 9) * 2, 0)
			.lineTo((x / 9) * 2, y)
			.moveTo((x / 9) * 4, 0)
			.lineTo((x / 9) * 4, y)
			.moveTo((x / 9) * 5, 0)
			.lineTo((x / 9) * 5, y)
			.moveTo((x / 9) * 7, 0)
			.lineTo((x / 9) * 7, y)
			.moveTo((x / 9) * 8, 0)
			.lineTo((x / 9) * 8, y)
			.moveTo(0, (y / 9) * 1)
			.lineTo(x, (y / 9) * 1)
			.moveTo(0, (y / 9) * 2)
			.lineTo(x, (y / 9) * 2)
			.moveTo(0, (y / 9) * 4)
			.lineTo(x, (y / 9) * 4)
			.moveTo(0, (y / 9) * 5)
			.lineTo(x, (y / 9) * 5)
			.moveTo(0, (y / 9) * 7)
			.lineTo(x, (y / 9) * 7)
			.moveTo(0, (y / 9) * 8)
			.lineTo(x, (y / 9) * 8);

		ctx.lineStyle(2, majorLineColor, 1)
			.moveTo((x / 9) * 3, 0)
			.lineTo((x / 9) * 3, y)
			.moveTo((x / 9) * 6, 0)
			.lineTo((x / 9) * 6, y)
			.moveTo(0, (y / 9) * 3)
			.lineTo(x, (y / 9) * 3)
			.moveTo(0, (y / 9) * 6)
			.lineTo(x, (y / 9) * 6);

		ctx.lineStyle(4, majorLineColor, 1, 1).moveTo(0, 0).lineTo(0, y).moveTo(0, y).lineTo(x, y);
		ctx.lineStyle(4, majorLineColor, 1, 0).moveTo(0, 0).lineTo(x, 0).moveTo(x, 0).lineTo(x, y);
	}
}
