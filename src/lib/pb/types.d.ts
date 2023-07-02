export type Auth = {
	id: string;
	email: string;
	avatar?: string;
	name?: string;
	username?: string;
};

export type URLShortener = {
	id: string;
	created: Date;
	updated: Date;
	key: string;
	url: string;
	published: boolean;
	author: string;
	access_after?: Date;
	access_until?: Date;
};
