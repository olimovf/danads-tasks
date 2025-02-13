const calculateDiscount = require("../src/calculateDiscount");

describe("Discount Calculation", () => {
	test("Non-member customer with $50 cost should have no discount", () => {
		expect(calculateDiscount(50, false)).toBe(0);
	});

	test("Non-member customer with exactly $100 cost should have no discount", () => {
		expect(calculateDiscount(100, false)).toBe(0);
	});

	test("Non-member customer with $150 cost should have 10% discount", () => {
		expect(calculateDiscount(150, false)).toBe(10);
	});

	test("Member customer with $80 cost should have 5% discount", () => {
		expect(calculateDiscount(80, true)).toBe(5);
	});

	test("Member customer with exactly $100 cost should have 5% discount", () => {
		expect(calculateDiscount(100, true)).toBe(5);
	});

	test("Member customer with $120 cost should have 15% discount", () => {
		expect(calculateDiscount(120, true)).toBe(15);
	});
});
