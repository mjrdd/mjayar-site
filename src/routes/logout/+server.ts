import { redirect } from "@sveltejs/kit";

export async function POST({ locals, url }) {
	locals.pb.authStore.clear();

	const redirectURL = url.searchParams.get("redirect_to");
	if (redirectURL) throw redirect(302, redirectURL);

	return new Response(undefined, { status: 200 });
}
