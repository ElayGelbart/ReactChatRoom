import React from "react";
import validator from "validator";

interface FieldState {
  error: boolean;
  text: string;
}
export default function validateFieldsWithErrors(
  usernameString: string,
  setUsernameInputProps: React.Dispatch<React.SetStateAction<FieldState>>,
  passwordString: string,
  setPasswordInputProps: React.Dispatch<React.SetStateAction<FieldState>>,
  emailString: string,
  setEmailInputProps: React.Dispatch<React.SetStateAction<FieldState>>
): boolean {
  if (
    !validator.isAlphanumeric(usernameString) ||
    !validator.isLength(usernameString, { min: 3, max: 20 })
  ) {
    setUsernameInputProps({
      error: true,
      text: "only Alphanumeric (3-20)",
    });
    return false;
  }
  setUsernameInputProps({
    error: false,
    text: "must Alphanumeric (3-20)",
  });
  if (!validator.isStrongPassword(passwordString, { minLength: 4 })) {
    setPasswordInputProps({
      error: true,
      text: "must be strong Password",
    });
    return false;
  }
  setPasswordInputProps({
    error: false,
    text: "must be strong Password",
  });
  if (!validator.isEmail(emailString)) {
    setEmailInputProps({
      error: true,
      text: "must be valid Email",
    });
    return false;
  }
  setEmailInputProps({
    error: false,
    text: "must be valid Email",
  });
  return true;
}
