import { redirect } from "@sveltejs/kit";

export async function POST({ locals, url }) {
	locals.pb.authStore.clear();

	const params = Object.fromEntries(url.searchParams.entries());
	if (params.redirectTo) {
		throw redirect(303, params.redirectTo);
	}

	return new Response();
}
