const { axios, ACCOUNT_ID } = require("../config/api.config");

describe("Testing Movie DB API", () => {
	describe("GET requests", () => {
		test("GET /list/1", async () => {
			const response = await axios("get", "/list/1");
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();

			const expectedKeys = [
				"id",
				"name",
				"items",
				"item_count",
				"created_by",
				"poster_path",
				"description",
			];
			const receivedKeys = Object.keys(response.body);
			expect(receivedKeys).toEqual(expect.arrayContaining(expectedKeys));

			const { items } = response.body;
			expect(items).toBeInstanceOf(Array);
			expect(items.length).toBeGreaterThan(0);

			const movie = items[0];
			expect(movie).toHaveProperty("id");
			expect(movie).toHaveProperty("title");
		});

		test("GET /movie/changes", async () => {
			const response = await axios("get", "/movie/changes");
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();

			const expectedKeys = ["results", "page", "total_pages", "total_results"];
			const receivedKeys = Object.keys(response.body);
			expect(receivedKeys).toEqual(expect.arrayContaining(expectedKeys));

			const { results } = response.body;
			expect(results).toBeInstanceOf(Array);
			expect(results.length).toBeGreaterThan(0);

			const movie = results[0];
			expect(movie).toHaveProperty("id");
			expect(movie).toHaveProperty("adult");
		});
	});

	describe("POST requests", () => {
		test("POST /favorite", async () => {
			const bodyData = {
				media_type: "movie",
				media_id: 123,
				favorite: true,
			};
			const response = await axios(
				"post",
				`/account/${ACCOUNT_ID}/favorite`,
				bodyData
			);

			expect(response.status).toBe(201);
			expect(response.body).toBeDefined();

			const result = response.body;
			expect(result).toHaveProperty("status_code");
			expect(result).toHaveProperty("status_message");
			expect(result.status_code).toBe(1);
			expect(result.status_message).toBe("Success.");
		});

		test("POST /rating", async () => {
			const bodyData = {
				value: 8,
			};
			const response = await axios("post", `/movie/123/rating`, bodyData);
			expect(response.status).toBe(201);
			expect(response.body).toBeDefined();

			const result = response.body;
			expect(result).toEqual({
				success: true,
				status_code: 1,
				status_message: "Success.",
			});
		});
	});

	describe("DELETE requests", () => {
		test("DELETE /rating", async () => {
			const response = await axios("delete", `/movie/123/rating`);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();

			const result = response.body;
			expect(result).toHaveProperty("success");
			expect(result).toHaveProperty("status_code");
			expect(result).toHaveProperty("status_message");

			expect(result.success).toBeTruthy();
			expect(result.status_code).toBe(13);
			expect(result.status_message).toBe(
				"The item/record was deleted successfully."
			);
		});
	});
});
