require("dotenv").config();
const supertest = require("supertest");

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCOUNT_ID = process.env.ACCOUNT_ID;

const api = supertest.agent(BASE_URL);

const request = async (method, url, data) => {
	const req = api[method](url)
		.set("accept", "application/json")
		.set("Authorization", `Bearer ${ACCESS_TOKEN}`);

	return data ? req.send(data) : req;
};

module.exports = { request, ACCOUNT_ID };
