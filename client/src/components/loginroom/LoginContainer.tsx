import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function LoginContainer() {
  const [passwordInputProps, setPasswordInputProps] = useState({
    error: false,
  });
  const LoginUsernameInput = useRef<HTMLInputElement>(null);
  const LoginPasswordInput = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function handleLogin(): Promise<void> {
    try {
      //TypeScript Type Validation
      if (
        LoginUsernameInput.current === null ||
        LoginPasswordInput.current === null
      ) {
        throw LoginUsernameInput;
      }
      const usernameValue: string = LoginUsernameInput.current.value;
      const passwordValue: string = LoginPasswordInput.current.value;

      await fetch("/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res;
      });
      navigate("/chat");
    } catch (err: unknown) {
      setPasswordInputProps({ error: true });
    }
  }

  return (
    <div id="loginContainer" className="userMangmentContainer">
      <h1 style={{ marginBottom: 50 }}>Login</h1>

      <TextField
        inputRef={LoginUsernameInput}
        id="loginUsernameInput"
        label="UserName"
        variant="outlined"
        helperText="Enter Username"
        autoFocus={true}
      />
      <TextField
        error={passwordInputProps.error}
        inputRef={LoginPasswordInput}
        id="loginPasswordInput"
        label="Password"
        variant="outlined"
        helperText="Enter Password"
      />
      <Button
        variant="contained"
        onClick={async () => {
          await handleLogin();
        }}
      >
        Login
      </Button>
    </div>
  );
}
