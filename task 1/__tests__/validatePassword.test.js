const validatePassword = require("../src/validatePassword");

const case1 = "Password123";
const case2 = "Pass";
const case3 = "PasswordPassword123";
const case4 = "password123";
const case5 = "PASSWORD123";
const case6 = "Passwordabc";

describe("Password Validation", () => {
	test(`Valid password ('${case1}') should return true`, () => {
		expect(validatePassword(case1)).toBe(true);
	});

	test(`Password with less than 8 chars ('${case2}') should return false`, () => {
		expect(validatePassword(case2)).toBe(false);
	});

	test(`Password with more than 12 chars ('${case3}') should return false`, () => {
		expect(validatePassword(case3)).toBe(false);
	});

	test(`Password with no uppercase ('${case4}') should return false`, () => {
		expect(validatePassword(case4)).toBe(false);
	});

	test(`Password with lowercase ('${case5}') should return false`, () => {
		expect(validatePassword(case5)).toBe(false);
	});

	test(`Password with no digit ('${case6}') should return false`, () => {
		expect(validatePassword(case6)).toBe(false);
	});
});
