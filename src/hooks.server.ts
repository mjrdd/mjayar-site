import { env } from "$env/dynamic/public";
import PocketBase, { Admin, ClientResponseError } from "pocketbase";

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase(env.PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090");
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

	try {
		event.locals.pb.authStore.isValid && event.locals.pb.authStore.model instanceof Admin
			? await event.locals.pb.admins.authRefresh()
			: await event.locals.pb.collection("users").authRefresh();
	} catch (err) {
		if (err instanceof ClientResponseError && err.status !== 0) {
			event.locals.pb.authStore.clear();
		}
	}

	const response = await resolve(event);
	response.headers.append("set-cookie", event.locals.pb.authStore.exportToCookie());
	return response;
}
