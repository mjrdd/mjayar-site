import { fail, redirect } from "@sveltejs/kit";
import { Admin, ClientResponseError } from "pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const loginSchema = z.object({
	emailOrUsername: z.string(),
	password: z.string()
});

export async function load({ locals }) {
	const auth = locals.pb.authStore.model;
	if (auth) {
		const redirectTo = auth instanceof Admin ? "/admin" : "/my-account";
		throw redirect(303, redirectTo);
	}
	const loginForm = await superValidate(loginSchema);
	return { loginForm };
}

export const actions = {
	default: async ({ locals, request, url }) => {
		const loginForm = await superValidate(request, loginSchema);

		if (!loginForm.valid) {
			return fail(400, {
				loginForm,
				message: null
			});
		}

		let auth;
		try {
			if (url.searchParams.has("admin")) {
				const res = await locals.pb.admins.authWithPassword(
					loginForm.data.emailOrUsername,
					loginForm.data.password
				);
				auth = res.admin;
			} else {
				const res = await locals.pb
					.collection("users")
					.authWithPassword(loginForm.data.emailOrUsername, loginForm.data.password);
				auth = res.record;
			}
		} catch (err) {
			if (err instanceof ClientResponseError && err.status !== 0) {
				return fail(err.status, {
					loginForm,
					message: err.message
				});
			}

			return fail(500, {
				loginForm,
				message: "An unexpected error has occurred. Please try again later."
			});
		}

		if (auth) {
			const redirectTo = auth instanceof Admin ? "/admin" : "/my-account";
			throw redirect(303, redirectTo);
		}

		return {
			loginForm,
			message: null
		};
	}
};
