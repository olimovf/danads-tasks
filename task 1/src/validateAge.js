// Age Validation

// A system requires users to enter their age, which must be between 18 and 60 years.
// Input Condition: Age

const validateAge = (age) => {
	const numAge = Number(age);
	return Number.isInteger(numAge) && 18 <= numAge && numAge <= 60;
};

module.exports = validateAge;
