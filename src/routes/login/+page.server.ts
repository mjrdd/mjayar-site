import { fail, redirect } from "@sveltejs/kit";
import { Admin, ClientResponseError } from "pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";
import { assert } from "$lib/utils";

const schemaAuth = z.object({
	emailOrUsername: z
		.string()
		.email()
		.or(z.string().regex(/^[a-zA-Z0-9_.-]*$/)),
	password: z.string()
});

const schemaOAuth = z.object({});

export async function load({ locals, url }) {
	if (locals.pb.authStore.model && locals.pb.authStore.isValid) {
		const redirectTo =
			url.searchParams.get("redirectTo") ||
			(locals.pb.authStore.model instanceof Admin ? "/admin/dashboard" : "/account/profile");
		throw redirect(303, redirectTo);
	}
	const formAuth = await superValidate(schemaAuth);
	const formOAuth = await superValidate(schemaOAuth);
	return { login_form: formAuth, formOAuth: formOAuth };
}

export const actions = {
	authWithPassword: async ({ locals, request, url }) => {
		const form = await superValidate(request, schemaAuth);
		if (!form.valid) {
			return fail(400, { login_form: form, message: undefined });
		}

		try {
			if (url.searchParams.has("admin")) {
				await locals.pb.admins.authWithPassword(
					form.data.emailOrUsername,
					form.data.password
				);
			} else {
				await locals.pb
					.collection("users")
					.authWithPassword(form.data.emailOrUsername, form.data.password);
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
	},

	authWithOAuth: async ({ cookies, locals, url }) => {
		let authProviderRedirectURL;

		try {
			const authMethods = await locals.pb.collection("users").listAuthMethods();
			const providerName = assert(url.searchParams.get("provider"));
			const authProvider = assert(
				authMethods.authProviders.find((provider) => provider.name == providerName)
			);

			const redirectURL = `${url.origin}/api/oauth/${providerName}`;
			authProviderRedirectURL = `${authProvider.authUrl}${redirectURL}`;

			const state = authProvider.state;
			const verifier = authProvider.codeVerifier;

			cookies.set("oauth_state", state);
			cookies.set("oauth_verifier", verifier);
		} catch (err) {
			return fail(400);
		}

		throw redirect(303, authProviderRedirectURL);
	}
};
