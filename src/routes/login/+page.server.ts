import { error, fail, redirect } from "@sveltejs/kit";
import { Admin, ClientResponseError } from "pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export async function load({ locals }) {
	const userModel = locals.pb.authStore.model;

	if (userModel) {
		const redirectTo = userModel instanceof Admin ? "/admin" : "/";
		throw redirect(303, redirectTo);
	}

	const form = await superValidate(loginSchema);
	return { form };
}

export const actions = {
	default: async function ({ locals, request }) {
		const form = await superValidate(request, loginSchema);
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		let record;
		try {
			const res = await locals.pb.admins.authWithPassword(
				form.data.email,
				form.data.password
			);
			record = res.admin;
		} catch (err) {
			if (err instanceof ClientResponseError) {
				return fail(400, { message: err.message });
			}

			throw error(500);
		}

		if (record && record instanceof Admin) {
			throw redirect(303, "/admin");
		}
		return { form };
	}
};
