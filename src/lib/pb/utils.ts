import type { Admin, Record } from "pocketbase";

export function getAvatarUrl(locals: App.Locals, model: Record | Admin) {
	const baseUrl = locals.pb.baseUrl;

	if (model.avatar) {
		return `${baseUrl}/api/files/${model.collectionId}/${model.id}/${model.avatar}`;
	}
}
