const validateQuantity = require("../src/validateQuantity");

const case1 = 3;
const case2 = 0;
const case3 = -2;
const case4 = "five";
const case5 = 5.5;

describe("Quantity Validation", () => {
	test(`Positive integer (${case1}) should return true`, () => {
		expect(validateQuantity(case1)).toBe(true);
	});
	test(`Zero (${case2}) should return false`, () => {
		expect(validateQuantity(case2)).toBe(false);
	});
	test(`Negative number (${case3}) should return false`, () => {
		expect(validateQuantity(case3)).toBe(false);
	});
	test(`String ('${case4}') should return false`, () => {
		expect(validateQuantity(case4)).toBe(false);
	});
	test(`Decimal number (${case5}) should return false`, () => {
		expect(validateQuantity(case5)).toBe(false);
	});
});
