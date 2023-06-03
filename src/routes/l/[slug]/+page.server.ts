import { error, fail, redirect } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";

export async function load({ locals, params, url }) {
	let record;

	try {
		record = await locals.pb
			.collection("url-shortener")
			.getFirstListItem(`key="${params.slug}"`);
	} catch (err) {
		if (err instanceof ClientResponseError) {
			return fail(400);
		}

		throw error(500);
	}

	const showStat = Boolean(url.searchParams.get("stat"));

	if (record && !showStat) {
		throw redirect(303, record.link);
	}

	return {
		record: structuredClone(record)
	};
}
