import { useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validator from "validator";
export default function RegisterContainer() {
  const registerUsernameInput = useRef<HTMLInputElement>(null);
  const registerPasswordInput = useRef<HTMLInputElement>(null);
  const registerEmailInput = useRef<HTMLInputElement>(null);

  async function handleRegister() {
    if (
      !registerUsernameInput.current ||
      !registerPasswordInput.current ||
      !registerEmailInput.current
    ) {
      return;
    }
    const usernameValue: string = registerUsernameInput.current.value;
    const passwordValue: string = registerPasswordInput.current.value;
    const emailValue: string = registerEmailInput.current.value;
    if (
      !validator.isAlphanumeric(usernameValue) ||
      !validator.isLength(usernameValue, { min: 3, max: 20 })
    ) {
      return; //alert username
    }
    if (!validator.isEmail(emailValue)) {
      return; // alert email
    }
    if (!validator.isStrongPassword(passwordValue, { minLength: 4 })) {
      return; // alert password
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
        alert("username taken");
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
        inputRef={registerUsernameInput}
        id="registerUsernameInput"
        label="UserName"
        variant="outlined"
        helperText="Enter Username"
      />
      <TextField
        inputRef={registerPasswordInput}
        id="registerPasswordInput"
        label="Password"
        type="password"
        variant="outlined"
        helperText="Enter Secure Password"
      />
      <TextField
        inputRef={registerEmailInput}
        id="registerEmailInput"
        label="Email"
        variant="outlined"
        helperText="Enter Email"
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
