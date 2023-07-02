import { redirect } from "@sveltejs/kit";
import { getAvatarUrl } from "$lib/pb/utils";
import type { Auth } from "$lib/pb/types";

export async function load({ locals, url }) {
	if (!locals.pb.authStore.model || !locals.pb.authStore.isValid) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}

	const model = locals.pb.authStore.model;

	return {
		auth: {
			id: model.id,
			avatar: getAvatarUrl(locals, model),
			email: model.email,
			name: model.name,
			username: model.username
		} as Auth
	};
}
