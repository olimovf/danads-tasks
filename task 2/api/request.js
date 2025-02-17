const supertest = require("supertest");
const { BASE_URL } = require("../config/movieDB");
const { ACCESS_TOKEN } = require("../config/constants");

class Request {
	constructor(baseURL = BASE_URL, accessToken = ACCESS_TOKEN) {
		this.api = supertest.agent(baseURL);
		this.headers = {
			accept: "application/json",
			authorization: `Bearer ${accessToken}`,
		};
	}

	setHeader(key, value) {
		this.headers[key] = value;
	}

	async get(url, queryParams = {}) {
		return this.api.get(url).set(this.headers).query(queryParams);
	}

	async post(url, data = {}, queryParams = {}) {
		return this.api.post(url).set(this.headers).send(data).query(queryParams);
	}

	async delete(url, data = {}) {
		return this.api.set(this.headers).delete(url).send(data);
	}
}

module.exports = Request;
