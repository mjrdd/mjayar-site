import { fail, redirect } from "@sveltejs/kit";
import { Admin, ClientResponseError } from "pocketbase";
import { setError, superValidate } from "sveltekit-superforms/server";
import { z } from "zod";
import { assert } from "$lib/utils";

const loginWithPasswordSchema = z.object({
	emailOrUsername: z
		.string()
		.email()
		.or(z.string().regex(/^[a-zA-Z0-9_.-]*$/)),
	password: z.string()
});

const loginWithOAuthSchema = z.object({});

export async function load({ locals, url }) {
	if (locals.pb.authStore.model) {
		const redirectTo =
			url.searchParams.get("redirectTo") ||
			(locals.pb.authStore.model instanceof Admin ? "/admin/dashboard" : "/account/profile");
		throw redirect(303, redirectTo);
	}
	const loginWithPasswordForm = await superValidate(loginWithPasswordSchema);
	const loginWithOAuthForm = await superValidate(loginWithOAuthSchema);
	return { loginWithPasswordForm, loginWithOAuthForm };
}

export const actions = {
	loginWithPassword: async ({ locals, request, url }) => {
		const form = await superValidate(request, loginWithPasswordSchema);
		if (!form.valid) {
			return fail(400, { loginWithPasswordForm: form });
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
				return setError(form, err.message, { status: 400 });
			}

			return setError(form, "An unexpected error has occurred. Please try again later.", {
				status: 500
			});
		}

		const redirectTo =
			url.searchParams.get("redirectTo") ||
			(locals.pb.authStore.model instanceof Admin ? "/admin/dashboard" : "/account/profile");
		throw redirect(303, redirectTo);
	},

	loginWithOAuth: async ({ cookies, locals, url }) => {
		let authProviderRedirectURL;

		try {
			const authMethods = await locals.pb.collection("users").listAuthMethods();
			const providerName = assert(url.searchParams.get("provider"));
			const authProvider = assert(
				authMethods.authProviders.find((provider) => provider.name == providerName)
			);

			const redirectURL = `${url.origin}/login/oauth/${providerName}`;
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
