import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./loginroom/LoginPage";
import ChatPage from "./chatroom/ChatPage";
import { Provider } from "react-redux";
import store from "../redux/store";
export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
      </Routes>
    </Provider>
  );
}
