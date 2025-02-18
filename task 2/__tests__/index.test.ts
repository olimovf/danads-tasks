import Request from "../api/request";
import { CONFIG } from "../config";
import { MOVIE_DB } from "../config/movieDB";

const { ACCOUNT_ID, USERNAME, PASSWORD } = CONFIG;
const {
	GET_LISTS_URL,
	CREATE_LIST_URL,
	ADD_MOVIE_URL,
	REMOVE_MOVIE_URL,
	GET_LIST_DETAILS_URL,
	CLEAR_LIST_URL,
	CHECK_LIST_STATUS_URL,
	DELETE_LIST_URL,
	CREATE_REQUEST_TOKEN_URL,
	VALIDATE_REQUEST_TOKEN_URL,
	CREATE_SESSION_URL,
	DELETE_SESSION_URL,
} = MOVIE_DB;

const request = new Request();
const MEDIA_ID = 128;

const initializeListId = async (sessionId: string): Promise<number> => {
	const bodyData = {
		name: "My New List 5",
		description: "This is my new list 5",
		language: "uz",
	};
	const response = await request.post(CREATE_LIST_URL, bodyData, {
		session_id: sessionId,
	});

	expect(response.status).toBe(201);
	expect(response.body).toBeDefined();
	expect(response.body.success).toBeTruthy();

	return response.body.list_id;
};

describe("LIST requests", () => {
	let requestToken: string;
	let sessionId: string;

	beforeAll(async () => {
		// create a request token
		const response = await request.get(CREATE_REQUEST_TOKEN_URL);
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.success).toBeTruthy();

		requestToken = response.body.request_token;

		// validate the request token
		const bodyData = {
			username: USERNAME,
			password: PASSWORD,
			request_token: requestToken,
		};
		const validateResponse = await request.post(
			VALIDATE_REQUEST_TOKEN_URL,
			bodyData
		);
		expect(validateResponse.status).toBe(200);
		expect(validateResponse.body).toBeDefined();
		expect(validateResponse.body.success).toBeTruthy();

		// create a new session
		const sessionResponse = await request.post(CREATE_SESSION_URL, {
			request_token: requestToken,
		});
		expect(sessionResponse.status).toBe(200);
		expect(sessionResponse.body).toBeDefined();
		expect(sessionResponse.body.success).toBeTruthy();

		sessionId = sessionResponse.body.session_id;
	});

	afterAll(async () => {
		// delete the session
		const bodyData = { session_id: sessionId };
		const response = await request.delete(DELETE_SESSION_URL, bodyData);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ success: true });
	});

	describe("Positive test cases", () => {
		let listId: number;

		beforeAll(async () => {
			listId = await initializeListId(sessionId);
		});

		test("should get the lists and find the created list", async () => {
			const url = GET_LISTS_URL(ACCOUNT_ID);
			const response = await request.get(url, { session_id: sessionId });
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();

			const expectedKeys = ["results", "page", "total_pages", "total_results"];
			const receivedKeys = Object.keys(response.body);
			expect(receivedKeys).toEqual(expect.arrayContaining(expectedKeys));

			const { results } = response.body;
			expect(results).toBeInstanceOf(Array);
			expect(results.length).toBeGreaterThan(0);

			const myList = results.find((list: { id: number }) => list.id === listId);
			expect(myList).toBeDefined();
		});

		test("should add a movie to the list", async () => {
			const url = ADD_MOVIE_URL(listId);
			const bodyData = { media_id: MEDIA_ID };
			const response = await request.post(url, bodyData, {
				session_id: sessionId,
			});

			expect(response.status).toBe(201);
			expect(response.body).toBeDefined();
			expect(response.body.success).toBeTruthy();
		});

		test("should check if the new movie has been added to the list", async () => {
			const url = CHECK_LIST_STATUS_URL(listId);
			const response = await request.get(url, { movie_id: MEDIA_ID });

			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body).toEqual({
				id: listId.toString(),
				item_present: true,
			});
		});

		test("should clear the list", async () => {
			const url = CLEAR_LIST_URL(listId);
			const response = await request.post(
				url,
				{},
				{
					confirm: true,
					session_id: sessionId,
				}
			);

			expect(response.status).toBe(201);
			expect(response.body).toBeDefined();
			expect(response.body.success).toBeTruthy();
		});

		test("should get the list details and be empty list", async () => {
			const url = GET_LIST_DETAILS_URL(listId);
			const response = await request.get(url);

			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body).toHaveProperty("items");

			const { items } = response.body;
			expect(items).toBeInstanceOf(Array);
			expect(items.length).toBe(0);
		});

		test("should delete the list", async () => {
			const url = DELETE_LIST_URL(listId);
			const response = await request.delete(url);

			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.success).toBeTruthy();
		});
	});

	describe("Negative test cases", () => {
		let listId: number;

		beforeAll(async () => {
			listId = await initializeListId(sessionId);
		});

		test("should not allow adding the same movie twice to the list", async () => {
			const bodyData = { media_id: MEDIA_ID };
			// Add the movie first time
			const url = ADD_MOVIE_URL(listId);
			const addResponse = await request.post(url, bodyData, {
				session_id: sessionId,
			});

			expect(addResponse.status).toBe(201);
			expect(addResponse.body).toBeDefined();
			expect(addResponse.body.success).toBeTruthy();

			// Try adding the same movie again
			const duplicateResponse = await request.post(url, bodyData, {
				session_id: sessionId,
			});

			expect(duplicateResponse.status).toBe(403);
			expect(duplicateResponse.body).toBeDefined();
			expect(duplicateResponse.body.success).toBeFalsy();
		});

		test("should handle invalid movie ID correctly when checking list status", async () => {
			const movieId = 550; // movie ID that doesn't exist in the list
			const url = CHECK_LIST_STATUS_URL(listId);
			const response = await request.get(url, { movie_id: movieId });

			expect(response.status).toBe(200); // still 200, but item_present should be false
			expect(response.body).toBeDefined();
			expect(response.body).toEqual({
				id: listId.toString(),
				item_present: false,
			});
		});

		test("should not allow deleting the list that doesn't exist", async () => {
			const invalidListId = 1000000000;
			const url = DELETE_LIST_URL(invalidListId);
			const deleteResponse = await request.delete(url);

			expect(deleteResponse.status).toBe(404);
			expect(deleteResponse.body).toBeDefined();
			expect(deleteResponse.body.success).toBeFalsy();
		});

		test("should not allow deleting a movie from a cleared list", async () => {
			// Clear the list first
			const clearUrl = CLEAR_LIST_URL(listId);
			const clearResponse = await request.post(
				clearUrl,
				{},
				{
					confirm: true,
					session_id: sessionId,
				}
			);

			expect(clearResponse.status).toBe(201);
			expect(clearResponse.body).toBeDefined();
			expect(clearResponse.body.success).toBeTruthy();

			// Try to delete a movie from the empty list
			const removeUrl = REMOVE_MOVIE_URL(listId);
			const removeMovieResponse = await request.delete(removeUrl, {
				media_id: MEDIA_ID,
			});

			expect(removeMovieResponse.status).toBe(404);
			expect(removeMovieResponse.body).toBeDefined();
			expect(removeMovieResponse.body.success).toBeFalsy();
		});
	});
});
