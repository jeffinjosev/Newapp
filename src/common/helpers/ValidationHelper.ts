const passwordLenghtRegex = /^.{8,16}$/;

const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

export const emailRegex =
  /^[a-zA-Z0-9._%+-]+(?<!\.)@[a-zA-Z0-9-]+(?<!\.)\.[a-zA-Z]{2,}$/;

const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

export const decimelPattern = /^[0-9]+(\.[0-9]{1,2})?$/;

export const numberPattern = /^[0-9]*$/;

export const zipCodeRegex = /^[0-9]{5}([0-9]{4})?$/;

export const isNotEmpty = (value: string | undefined) => {
  return value && value?.length >= 1;
};

export const isValidEmail = (email: string) => {
  return emailRegex.test(email);
};
export const isValidPassword = (password: string) => {
  return passwordRegex.test(password);
};

const findInvalidPasswordChars = (password: string) => {
  // Define the regex to match valid characters
  const validCharRegex = /[a-zA-Z\d!@#$%^&*(),.?":{}|<>]/;

  // List to store invalid characters
  let invalidChars = [];

  // Check each character in the password
  for (let char of password) {
    if (!validCharRegex.test(char)) {
      invalidChars.push(char);
    }
  }

  // Return invalid characters as a string separated by commas
  return invalidChars.join(' ');
};

export const isValidName = (name: string) => {
  return nameRegex.test(name);
};

export const isValidOtp = (otp: string) => {
  return numberPattern?.test(otp) && otp?.length == 6;
};

export const isValidConfirmPassword = (
  confirmPassword: string,
  password: string,
) => {
  return (
    confirmPassword &&
    confirmPassword.length >= 1 &&
    confirmPassword === password
  );
};

export const isValidNewPassword = (
  newPassword: string,
  oldPassword: string,
) => {
  return (
    newPassword &&
    newPassword.length >= 1 &&
    passwordRegex.test(newPassword) &&
    newPassword !== oldPassword
  );
};

export const isValidPhone = (input: string) => {
  return input?.length == 10 && numberPattern.test(input);
};

export const isValidAddress = (address: string) => {
  return address && address?.length >= 1;
};
