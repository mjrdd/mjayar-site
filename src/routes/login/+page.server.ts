import { fail, redirect } from "@sveltejs/kit";
import { Admin, ClientResponseError } from "pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export async function load({ locals }) {
	const model = locals.pb.authStore.model;

	if (model) {
		const redirectTo = model instanceof Admin ? "/admin" : "/";
		throw redirect(303, redirectTo);
	}

	const form = await superValidate(loginSchema);
	return { form };
}

export const actions = {
	default: async function ({ locals, request }) {
		const form = await superValidate(request, loginSchema);
		if (!form.valid) {
			return fail(400, { form, message: null });
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
				return fail(err.status === 0 ? 500 : err.status, {
					form,
					message: err.message
				});
			}

			return fail(500, {
				form,
				message: "An unexpected error has occurred. Please try again later."
			});
		}

		if (record && record instanceof Admin) {
			throw redirect(303, "/admin");
		}
		return { form, message: null };
	}
};
