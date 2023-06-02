import { error, fail, redirect } from "@sveltejs/kit";
import { Admin, ClientResponseError } from "pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export async function load({ locals }) {
	if (locals.pb.authStore.model) {
		throw redirect(303, "/");
	}

	const form = await superValidate(loginSchema);
	return { form };
}

export const actions = {
	default: async function ({ locals, request }) {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		let record;

		try {
			// TODO: Add form validation

			const res = await locals.pb.admins.authWithPassword(
				form.data.email,
				form.data.password
			);
			record = res.admin;
		} catch (err) {
			if (err instanceof ClientResponseError) {
				// TODO: Handle database error
			}

			throw error(500);
		}

		if (record && record instanceof Admin) {
			throw redirect(308, "/admin");
		}

		return { form };
	}
};
