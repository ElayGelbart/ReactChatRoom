import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
//Style
import "./chatroom.css";
// My Components
import UsersLoggedContainer from "./UsersLoggedContainer";
import SendChatContainer from "./SendChatContainer";
import ChatLog from "./ChatLog";
import LoadingSVG from "../svg/LoadingSVG";
// Redux
import { useDispatch } from "react-redux";
import { setSSEaction } from "../../redux/slices/dataSlices";
import { userInfo } from "os";
// Context
export const UsernameContext = React.createContext({ username: "" });
export const socket = io();

export default function ChatPage(): JSX.Element {
  const [IsAuth, setIsAuth] = useState(false);
  const [UserInfo, setUserInfo] = useState<{ username: string }>({
    username: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    async function setSSE(): Promise<void> {
      socket.on("connect", () => {
        console.log("connected");
      });
      socket.on("msgsUsersData", (data) => {
        console.log(JSON.parse(data));
        dispatch(setSSEaction(JSON.parse(data)));
      });
      console.log("userInfo", userInfo);
      socket.emit("userConnect", { username: UserInfo.username });
      const JWToken = document.cookie.split("=")[1];
      console.log(JWToken, "the token");
    }
    setSSE();
  }, [UserInfo]);
  useEffect(() => {
    async function CheckAuth() {
      try {
        const JWToken = document.cookie.split("=")[1];
        const response = await fetch("/user/auth", {
          method: "POST",
          headers: {
            authorization: `Bearer ${JWToken}`,
            Accept: "text/event-stream; charset=utf-8",
          },
        }).then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res;
        });
        const cookieUsernameObj = await response.json();
        console.log("cookieUsernameObj", cookieUsernameObj);
        setUserInfo(cookieUsernameObj);
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      }
    }
    CheckAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (IsAuth === true) {
    return (
      <div>
        <div id="chatContainer">
          <UsernameContext.Provider value={UserInfo}>
            <UsersLoggedContainer />
            <SendChatContainer />
            <ChatLog />
          </UsernameContext.Provider>
        </div>
      </div>
    );
  }
  return (
    <div>
      <LoadingSVG />
    </div>
  );
}
