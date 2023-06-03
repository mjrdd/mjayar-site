import { error, redirect } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";
import { isDate, isPast, toDate } from "date-fns";

export async function load({ locals, params, url }) {
	let record;

	try {
		record = await locals.pb
			.collection("url_shortener")
			.getFirstListItem(`key="${params.slug}"`);
	} catch (err) {
		if (err instanceof ClientResponseError) {
			throw error(404, {
				message:
					"The requested information could not be found in the database. Please verify the link and if the error persists, kindly contact the administrator for further assistance."
			});
		}

		throw error(500, { message: "An unexpected error has occurred. Please try again later." });
	}

	const showStat = Boolean(url.searchParams.get("stat"));

	if (record && !showStat) {
		if (record.expiration && isDate(record.expiration) && isPast(toDate(record.expiration))) {
			throw error(400, {
				message:
					"The link you are trying to access has expired. Kindly reach out to the provider of the link for further assistance."
			});
		}

		throw redirect(303, record.url);
	}

	return {
		record: structuredClone(record)
	};
}
