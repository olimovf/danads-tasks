// Age Validation

// A system requires users to enter their age, which must be between 18 and 60 years.
// Input Condition: Age

const validateAge = (age) => {
	return Number.isInteger(age) && 18 <= age && age <= 60;
};

module.exports = validateAge;
