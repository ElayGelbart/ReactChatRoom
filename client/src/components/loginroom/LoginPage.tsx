import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./loginroom.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function LoginPage() {
  const LoginUsernameInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function handleLogin(): Promise<void> {
    try {
      //TypeScript Type Validation
      if (LoginUsernameInput.current === null) {
        throw LoginUsernameInput;
      }
      const usernameValue: string = LoginUsernameInput.current.value;
      await fetch("/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameValue }),
      }).then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res;
      });
      navigate("/chat");
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <div id="loginContainer">
      <h1 style={{ marginBottom: 100 }}>Login Page</h1>

      <TextField
        inputRef={LoginUsernameInput}
        id="loginInput"
        label="UserName"
        variant="outlined"
        helperText="Enter Username"
        autoFocus={true}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            await handleLogin();
          }
        }}
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
