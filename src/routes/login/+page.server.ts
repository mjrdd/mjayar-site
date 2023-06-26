import { fail, redirect } from "@sveltejs/kit";
import { Admin, ClientResponseError } from "pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const schema = z.object({
	email_or_username: z
		.string()
		.email()
		.or(z.string().regex(/^[a-zA-Z0-9]*$/)),
	password: z.string()
});

export async function load({ locals, url }) {
	if (locals.pb.authStore.model && locals.pb.authStore.isValid) {
		const redirectTo =
			url.searchParams.get("redirectTo") ||
			(locals.pb.authStore.model instanceof Admin ? "/admin/dashboard" : "/account/profile");
		throw redirect(303, redirectTo);
	}
	const form = await superValidate(schema);
	return { login_form: form };
}

export const actions = {
	default: async ({ locals, request, url }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { login_form: form, message: undefined });
		}

		try {
			if (url.searchParams.has("admin")) {
				await locals.pb.admins.authWithPassword(
					form.data.email_or_username,
					form.data.password
				);
			} else {
				await locals.pb
					.collection("users")
					.authWithPassword(form.data.email_or_username, form.data.password);
			}
		} catch (err) {
			if (err instanceof ClientResponseError && err.status !== 0) {
				return fail(err.status, { login_form: form, message: err.message });
			}
			return fail(500, {
				login_form: form,
				message: "An unexpected error has occurred. Please try again later."
			});
		}

		const redirectTo =
			url.searchParams.get("redirectTo") ||
			(locals.pb.authStore.model instanceof Admin ? "/admin/dashboard" : "/account/profile");
		throw redirect(303, redirectTo);
	}
};
