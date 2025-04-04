export const validateInput = (inputState) => {
  const { name, email, password, confirmPassword } = inputState;

  if (!name?.trim()) {
    return "Name is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return "Invalid email address";
  }

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters long and contain at least one letter, one number, and one special character(@$!%*?&#)";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return null; // Return null if validation passes
};
