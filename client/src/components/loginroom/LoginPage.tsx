import "./loginroom.css";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./RegisterContainer";

export default function LoginPage() {
  return (
    <div id="loginPage">
      <LoginContainer />
      <RegisterContainer />
    </div>
  );
}
