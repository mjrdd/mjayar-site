import { redirect } from "@sveltejs/kit";
import { isFuture, isPast } from "date-fns";
import { ClientResponseError } from "pocketbase";
import { HTTP_ERROR } from "$lib/http-errors";

export async function load({ locals, params }) {
	let record;
	try {
		record = await locals.pb
			.collection("url_shortener")
			.getFirstListItem(`key="${params.slug}"`);

		if (
			!record ||
			!record.published ||
			(record.access_after && isFuture(record.access_after))
		) {
			return { error: HTTP_ERROR.NOT_FOUND };
		}

		if (record.access_until && isPast(record.access_until)) {
			return { error: HTTP_ERROR.LINK_EXPIRED };
		}
	} catch (err) {
		if (err instanceof ClientResponseError && err.status !== 0) {
			return { error: { status: err.status, name: err.name, message: err.message } };
		}
		return { error: HTTP_ERROR.SERVER_ERROR };
	}
	throw redirect(303, record.url);
}
