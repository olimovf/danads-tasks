// Online Shopping Cart

// Consider an online store where users can add items to their cart.
// Input Condition: Quantity of an item to add to cart

// Valid:
// 	- Positive integers (e.g., 1, 5, 10)
// Invalid:
// 	- Zero (0)
// 	- Negative numbers (e.g., -1, -5)
// 	- Non-numeric values (e.g., "abc", "two")

const validateQuantity = (qty) => {
	const numQty = Number(qty);
	return Number.isInteger(numQty) && numQty > 0;
};

module.exports = validateQuantity;
