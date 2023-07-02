import { error } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";

export async function load({ locals, parent, url }) {
	const { auth } = await parent();
	const page = +(url.searchParams.get("page") || 1);

	try {
		const list = await locals.pb.collection("url_shortener").getList(page, 30, {
			filter: `author="${auth.id}"`
		});
		return { list: structuredClone(list) };
	} catch (err) {
		if (err instanceof ClientResponseError && err.status !== 0) {
			throw error(err.status, { message: err.message });
		}
		throw error(500);
	}
}
