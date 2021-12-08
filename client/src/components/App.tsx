import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./loginroom/LoginPage";
import ChatPage from "./chatroom/ChatPage";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/chat" element={<ChatPage />}></Route>
    </Routes>
  );
}
