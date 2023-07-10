import { error, redirect } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";
import { assert } from "$lib/utils";

export const GET = async ({ cookies, locals, params, url }) => {
	try {
		const authMethods = await locals.pb.collection("users").listAuthMethods();
		const authProvider = assert(
			authMethods.authProviders.find((provider) => provider.name == params.provider)
		);

		const expectedState = assert(cookies.get("oauth_state"));
		const expectedVerifier = assert(cookies.get("oauth_verifier"));
		const state = assert(url.searchParams.get("state"));
		const code = assert(url.searchParams.get("code"));

		if (expectedState != state) throw new Error("State is invalid");

		const redirectURL = `${url.origin}/api/oauth/${params.provider}`;

		await locals.pb
			.collection("users")
			.authWithOAuth2Code(authProvider.name, code, expectedVerifier, redirectURL);
	} catch (err) {
		if (err instanceof ClientResponseError && err.status != 0) {
			throw error(err.status, { message: err.message });
		}

		throw error(500);
	}

	throw redirect(303, "/account");
};
