export const HTTP_ERROR = {
	BAD_REQUEST: {
		status: 400,
		name: "Bad Request",
		message:
			"Oops! Something went wrong with your request. Please double-check your input and try again."
	},
	UNAUTHORIZED: {
		status: 401,
		name: "Unauthorized",
		message:
			"Sorry, but you're not authorized to access this resource. Please check your credentials and try again."
	},
	FORBIDDEN: {
		status: 403,
		name: "Forbidden",
		message:
			"Access denied! You don't have permission to access this resource. Please contact the administrator for assistance."
	},
	LINK_EXPIRED: {
		status: 403,
		name: "Link Expired",
		message:
			"The link you are trying to access has expired. Kindly reach out to the provider of the link for further assistance."
	},
	NOT_FOUND: {
		status: 404,
		name: "Not Found",
		message:
			"The requested information could not be found in the database. Please verify the link and if the error persists, kindly contact the administrator for further assistance."
	},
	SERVER_ERROR: {
		status: 500,
		name: "Internal Server Error",
		message: "An unexpected error has occurred. Please try again later."
	}
} as Record<
	"BAD_REQUEST" | "UNAUTHORIZED" | "FORBIDDEN" | "LINK_EXPIRED" | "NOT_FOUND" | "SERVER_ERROR",
	{ status: number; name: string; message: string }
>;
