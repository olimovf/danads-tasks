// Password Validation

// Imagine a website requires a password with the following criteria:
// 	- Must be 8-12 characters long
// 	- Must contain at least one uppercase letter
// 	- Must contain at least one lowercase letter
// 	- Must contain at least one digit

const validatePassword = (pwd) => {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,12}$/;
	return regex.test(pwd);
};

module.exports = validatePassword;
