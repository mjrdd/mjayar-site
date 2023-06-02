import { redirect } from "@sveltejs/kit";

export async function POST({ locals, url }) {
	const redirectTo = url.searchParams.get("redirectTo") || "/login";

	locals.pb.authStore.clear();
	throw redirect(303, redirectTo);
}
