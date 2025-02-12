const validateAge = require("../src/validateAge");

const case1 = 18;
const case2 = 60;
const case3 = 17;
const case4 = 61;
const case5 = 25.2;
const case6 = "30";

describe("Age Validation", () => {
	test(`Minimum age (${case1}) should return true`, () => {
		expect(validateAge(case1)).toBe(true);
	});
	test(`Maximum age (${case2}) should return true`, () => {
		expect(validateAge(case2)).toBe(true);
	});
	test(`Age below minimum (${case3}) should return false`, () => {
		expect(validateAge(case3)).toBe(false);
	});
	test(`Age above maximum (${case4}) should return false`, () => {
		expect(validateAge(case4)).toBe(false);
	});
	test(`Decimal age (${case5}) should return false`, () => {
		expect(validateAge(case5)).toBe(false);
	});
	test(`String age ('${case6}') should return false`, () => {
		expect(validateAge(case6)).toBe(false);
	});
});
