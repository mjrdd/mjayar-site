import { redirect } from "@sveltejs/kit";
import { Admin } from "pocketbase";

export async function load({ locals }) {
	const model = locals.pb.authStore.model;

	if (model && model instanceof Admin) {
		const collections = await locals.pb.collections.getFullList();

		return {
			admin: structuredClone(model),
			collections: structuredClone(collections)
		};
	}

	throw redirect(303, "/login");
}
