import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import { CONFIG } from "../config";
import { MOVIE_DB } from "../config/movieDB";
import { Headers, QueryParams, RequestData } from "../interfaces";

class Request {
    private api: TestAgent;
    private headers: Headers;

    constructor(
        baseURL: string = MOVIE_DB.BASE_URL,
        accessToken: string = CONFIG.ACCESS_TOKEN,
    ) {
        this.api = supertest.agent(baseURL);
        this.headers = {
            accept: "application/json",
            authorization: `Bearer ${accessToken}`,
        };
    }

    setHeader(key: string, value: string): void {
        this.headers[key] = value;
    }

    async get(url: string, queryParams: QueryParams = {}) {
        return this.api.get(url).set(this.headers).query(queryParams);
    }

    async post(
        url: string,
        data: RequestData = {},
        queryParams: QueryParams = {},
    ) {
        return this.api
            .post(url)
            .set(this.headers)
            .send(data)
            .query(queryParams);
    }

    async delete(url: string, data: RequestData = {}) {
        return this.api.delete(url).set(this.headers).send(data);
    }
}

export default Request;
