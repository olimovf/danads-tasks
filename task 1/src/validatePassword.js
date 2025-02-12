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

/* without regex */

// const validatePassword = (pwd) => {
// 	if (pwd.length < 8 || pwd.length > 12) {
// 		return false;
// 	}

// 	let hasUpper = false;
// 	let hasLower = false;
// 	let hasDigit = false;

// 	for (const ch of pwd) {
// 		if (ch >= "A" && ch <= "Z") {
// 			hasUpper = true;
// 		} else if (ch >= "a" && ch <= "z") {
// 			hasLower = true;
// 		} else if (ch >= "0" && ch <= "9") {
// 			hasDigit = true;
// 		}
// 	}

// 	return hasUpper && hasLower && hasDigit;
// };

module.exports = validatePassword;
