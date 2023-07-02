import PocketBase from "pocketbase";

declare global {
	namespace App {
		interface Locals {
			pb: PocketBase;
		}
	}

	declare module "*.md";
}
