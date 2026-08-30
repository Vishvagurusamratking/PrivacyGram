// Email validation
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password strength validation
const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

// Username validation
const validateUsername = (username) => {
  // 3-20 characters, alphanumeric and underscore only
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
};

module.exports = { validateEmail, validatePassword, validateUsername };