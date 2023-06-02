import PocketBase from "pocketbase";

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase("http://127.0.0.1:8090");
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

	try {
		event.locals.pb.authStore.isValid &&
			(await event.locals.pb.collection("users").authRefresh());
	} catch {
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);
	response.headers.append("set-cookie", event.locals.pb.authStore.exportToCookie());
	return response;
}
