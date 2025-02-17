const Request = require("../api/request");
const { ACCOUNT_ID, USERNAME, PASSWORD } = require("../config/constants");
const {
	GET_LISTS_URL,
	CREATE_LIST_URL,
	ADD_MOVIE_URL,
	GET_LIST_DETAILS_URL,
	CLEAR_LIST_URL,
	CHECK_LIST_STATUS_URL,
	DELETE_LIST_URL,
	CREATE_REQUEST_TOKEN_URL,
	VALIDATE_REQUEST_TOKEN_URL,
	CREATE_SESSION_URL,
	DELETE_SESSION_URL,
} = require("../config/movieDB");

const request = new Request();
const MEDIA_ID = 128;

describe("LIST requests", () => {
	let listId;
	let requestToken;
	let sessionId;

	beforeAll(async () => {
		// create a request token
		const response = await request.get(CREATE_REQUEST_TOKEN_URL);
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.success).toBe(true);

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
		expect(validateResponse.body.success).toBe(true);

		// create a new session
		const sessionResponse = await request.post(CREATE_SESSION_URL, {
			request_token: requestToken,
		});
		expect(sessionResponse.status).toBe(200);
		expect(sessionResponse.body).toBeDefined();
		expect(sessionResponse.body.success).toBe(true);

		sessionId = sessionResponse.body.session_id;
	});

	afterAll(async () => {
		// delete the session
		const bodyData = {
			session_id: sessionId,
		};
		const response = await request.delete(DELETE_SESSION_URL, bodyData);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			success: true,
		});
	});

	test("should create a new list", async () => {
		const bodyData = {
			name: "My List 1",
			description: "This is my list 1",
			language: "uz",
		};
		const response = await request.post(CREATE_LIST_URL, bodyData, {
			session_id: sessionId,
		});

		expect(response.status).toBe(201);
		expect(response.body).toBeDefined();
		expect(response.body.success).toBe(true);

		listId = response.body.list_id;
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

		const myList = results.find((list) => list.id === listId);
		expect(myList).toBeDefined();
	});

	test("should add a movie to the list", async () => {
		const url = ADD_MOVIE_URL(listId);
		const bodyData = {
			media_id: MEDIA_ID,
		};
		const response = await request.post(url, bodyData, {
			session_id: sessionId,
		});

		expect(response.status).toBe(201);
		expect(response.body).toBeDefined();
		expect(response.body.success).toBe(true);
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
		const response = await request.post(url, null, {
			confirm: true,
			session_id: sessionId,
		});

		expect(response.status).toBe(201);
		expect(response.body).toBeDefined();
		expect(response.body.success).toBe(true);
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
		expect(response.body.success).toBe(true);
	});
});
