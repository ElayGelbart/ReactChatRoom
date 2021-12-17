import "./loginroom.css";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./RegisterContainer";
import { useState } from "react";

export default function LoginPage() {
  const [LoginView, setLoginView] = useState<State.ViewInterface>({
    login: "0%",
    register: "100%",
  });
  return (
    <div id="loginPage">
      <LoginContainer LoginView={LoginView} setLoginView={setLoginView} />
      <RegisterContainer LoginView={LoginView} setLoginView={setLoginView} />
    </div>
  );
}
