export const MOVIE_DB = {
	// Base URL
	BASE_URL: "https://api.themoviedb.org/3",

	// API endpoints
	CREATE_LIST_URL: "/list",
	GET_LISTS_URL: (accountId: string) => `/account/${accountId}/lists`,
	ADD_MOVIE_URL: (listId: number) => `/list/${listId}/add_item`,
	REMOVE_MOVIE_URL: (listId: number) => `/list/${listId}/remove_item`,
	CHECK_LIST_STATUS_URL: (listId: number) => `/list/${listId}/item_status`,
	CLEAR_LIST_URL: (listId: number) => `/list/${listId}/clear`,
	GET_LIST_DETAILS_URL: (listId: number) => `/list/${listId}`,
	DELETE_LIST_URL: (listId: number) => `/list/${listId}`,

	// Authentication endpoints
	CREATE_REQUEST_TOKEN_URL: "/authentication/token/new",
	VALIDATE_REQUEST_TOKEN_URL: "/authentication/token/validate_with_login",
	CREATE_SESSION_URL: "/authentication/session/new",
	DELETE_SESSION_URL: "/authentication/session",
};
