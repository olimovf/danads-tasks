// Discount Calculation

// An e-commerce site offers discounts based on the following rules:
// 	- Customers with a membership get a 10% discount.
// 	- Customers who spend over $100 get a 5% discount.
// 	- Customers can get both discounts, with the membership discount applied first

const calculateDiscount = (cost, isMember) => {
	let discount = 0;

	discount += isMember ? 10 : 0;
	discount += cost > 100 ? 5 : 0;

	return discount;
};

module.exports = calculateDiscount;
