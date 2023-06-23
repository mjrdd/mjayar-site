import { redirect } from "@sveltejs/kit";

export async function POST({ locals, url }) {
	locals.pb.authStore.clear();

	if (url.searchParams.has("redirectTo")) {
		throw redirect(303, url.searchParams.get("redirectTo") || "/");
	}
	return new Response(undefined, { status: 200 });
}
