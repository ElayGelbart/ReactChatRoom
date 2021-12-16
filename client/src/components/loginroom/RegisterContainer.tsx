import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validateFieldsWithErrors from "../../utils/inputvalidation";

export default function RegisterContainer() {
  const [usernameInputProps, setUsernameInputProps] = useState({
    error: false,
    text: "Enter Username",
  });
  const [passwordInputProps, setPasswordInputProps] = useState({
    error: false,
    text: "Enter Password",
  });
  const [emailInputProps, setEmailInputProps] = useState({
    error: false,
    text: "Enter Email",
  });
  const registerUsernameInput = useRef<HTMLInputElement>(null);
  const registerPasswordInput = useRef<HTMLInputElement>(null);
  const registerEmailInput = useRef<HTMLInputElement>(null);

  async function handleRegister(): Promise<void> {
    if (
      registerUsernameInput.current == null ||
      registerPasswordInput.current == null ||
      registerEmailInput.current == null
    ) {
      return;
    }
    const usernameValue: string = registerUsernameInput.current.value;
    const passwordValue: string = registerPasswordInput.current.value;
    const emailValue: string = registerEmailInput.current.value;
    if (
      !validateFieldsWithErrors(
        usernameValue,
        setUsernameInputProps,
        passwordValue,
        setPasswordInputProps,
        emailValue,
        setEmailInputProps
      )
    ) {
      return;
    }
    try {
      const response = await fetch("/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
          email: emailValue,
        }),
      });
      if (!response.ok) {
        setUsernameInputProps({
          error: true,
          text: "Username Taken",
        });
        return; // alert username taken
      }
      alert("user added to database you can login");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="registerContainer" className="userMangmentContainer">
      <h1 style={{ marginBottom: 50 }}>Register</h1>

      <TextField
        error={usernameInputProps.error}
        inputRef={registerUsernameInput}
        id="registerUsernameInput"
        label="UserName"
        variant="outlined"
        helperText={usernameInputProps.text}
      />
      <TextField
        error={passwordInputProps.error}
        inputRef={registerPasswordInput}
        id="registerPasswordInput"
        label="Password"
        type="password"
        variant="outlined"
        helperText={passwordInputProps.text}
      />
      <TextField
        error={emailInputProps.error}
        inputRef={registerEmailInput}
        id="registerEmailInput"
        label="Email"
        variant="outlined"
        helperText={emailInputProps.text}
      />
      <Button
        variant="contained"
        onClick={async () => {
          await handleRegister();
        }}
      >
        Register
      </Button>
    </div>
  );
}
