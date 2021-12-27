import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const InputStyle = {
  margin: 10,
};

interface LoginProps {
  LoginView: State.ViewInterface;
  setLoginView: React.Dispatch<React.SetStateAction<State.ViewInterface>>;
}
export default function LoginContainer({
  LoginView,
  setLoginView,
}: LoginProps) {
  const [passwordInputProps, setPasswordInputProps] = useState({
    error: false,
  });
  const LoginUsernameInput = useRef<HTMLInputElement>(null);
  const LoginPasswordInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function handleLogin(): Promise<void> {
    try {
      if (
        // typegurad
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
    <div
      id="loginContainer"
      style={{ left: LoginView.login }}
      className="userMangmentContainer"
    >
      <div id="loginDiv" className="userMangmentDiv">
        <h1>Login check src twich2</h1>
        <div id="loginFields">
          <TextField
            style={InputStyle}
            className="loginPageInput"
            inputRef={LoginUsernameInput}
            id="loginUsernameInput"
            label="UserName"
            variant="outlined"
            helperText="Enter Username"
            autoFocus={true}
          />
          <TextField
            style={InputStyle}
            className="loginPageInput"
            error={passwordInputProps.error}
            inputRef={LoginPasswordInput}
            id="loginPasswordInput"
            label="Password"
            type="password"
            variant="outlined"
            helperText="Enter Password"
          />
        </div>
        <Button
          variant="contained"
          onClick={async () => {
            await handleLogin();
          }}
        >
          Login
        </Button>

        <div
          className="goTo"
          id="goToRegister"
          onClick={() => {
            setLoginView({ login: "-100%", register: "0%" });
          }}
        >
          Register
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
}
