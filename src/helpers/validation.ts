// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password requirements:
// - Minimum 8 characters
// - At least one uppercase letter
// - At least one lowercase letter
// - At least one number
// - At least one special character
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateEmail = (
  email: string
): { valid: boolean; message?: string } => {
  if (!email) return { valid: false, message: "Email is required" };
  if (!EMAIL_REGEX.test(email))
    return { valid: false, message: "Please enter a valid email address" };
  return { valid: true };
};

export const validatePassword = (
  password: string
): { valid: boolean; message?: string } => {
  if (!password) return { valid: false, message: "Password is required" };
  if (password.length < 8)
    return { valid: false, message: "Password must be at least 8 characters" };
  // if (!PASSWORD_REGEX.test(password)) {
  //   return {
  //     valid: false,
  //     message:
  //       "Password must contain uppercase, lowercase, number, and special character",
  //   };
  // }
  return { valid: true };
};

export const validateName = (
  name: string
): { valid: boolean; message?: string } => {
  if (!name) return { valid: false, message: "Name is required" };
  if (name.length < 2)
    return { valid: false, message: "Name must be at least 2 characters" };
  return { valid: true };
};
