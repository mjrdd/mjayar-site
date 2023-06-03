export async function load({ locals, parent }) {
	await parent();

	const { items } = await locals.pb.collection("users").getList(1, 20, { sort: "created" });
	const users = items.map((item) => structuredClone(item));

	return { users };
}
