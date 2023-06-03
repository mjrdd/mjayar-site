import { redirect } from "@sveltejs/kit";
import { Admin } from "pocketbase";

export async function load({ locals }) {
	const authModel = locals.pb.authStore.model;

	if (authModel && authModel instanceof Admin) {
		const collections = await locals.pb.collections.getFullList();

		return {
			admin: structuredClone(authModel),
			collections: structuredClone(collections)
		};
	}

	throw redirect(303, "/login");
}
