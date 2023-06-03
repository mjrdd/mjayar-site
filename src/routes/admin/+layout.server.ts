import { redirect } from "@sveltejs/kit";
import { Admin } from "pocketbase";

export async function load({ locals }) {
	const userModel = locals.pb.authStore.model;

	if (userModel && userModel instanceof Admin) {
		return {
			admin: structuredClone(userModel)
		};
	}

	throw redirect(303, "/login");
}
