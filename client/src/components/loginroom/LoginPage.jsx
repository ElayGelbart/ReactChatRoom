import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./loginroom.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function LoginPage(props) {
  const LoginUsernameInput = useRef(null);
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const usernameValue = LoginUsernameInput.current.value;
      await fetch("/users/login", {
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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="loginContainer">
      <h1>Login Page</h1>
      <div>
        <TextField
          inputRef={LoginUsernameInput}
          id="loginInput"
          label="UserName"
          variant="outlined"
          helperText="Some important text"
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
    </div>
  );
}
