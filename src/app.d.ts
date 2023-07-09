import "@total-typescript/ts-reset"
import PocketBase from "pocketbase";

declare global {
	namespace App {
		interface Locals {
			pb: PocketBase;
		}
	}

	declare module "*.md";
}
