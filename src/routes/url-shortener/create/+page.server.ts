import { fail, redirect } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const schema = z.object({
	key: z.string(),
	url: z.string().url(),
	published: z.boolean().optional(),
	access_after: z.date().optional(),
	access_until: z.date().optional()
});

export async function load({ parent }) {
	await parent();
	const form = await superValidate(schema);
	return { create_form: form };
}

export const actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { create_form: form, message: undefined });
		}

		if (!locals.pb.authStore.model || !locals.pb.authStore.isValid) {
			return fail(403, { create_form: form, message: undefined });
		}

		try {
			await locals.pb.collection("url_shortener").create({
				...form.data,
				published: false,
				author: locals.pb.authStore.model.id
			});
		} catch (err) {
			if (err instanceof ClientResponseError && err.status !== 0) {
				return fail(err.status, { create_form: form, message: err.message });
			}
			return fail(500, { create_form: form, message: "" });
		}
		throw redirect(303, "/url-shortener");
	}
};
