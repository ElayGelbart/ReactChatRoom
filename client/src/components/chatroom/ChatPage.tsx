import React, { useEffect, useState } from "react";
//Style
import "./chatroom.css";
// My Components
import UsersLoggedContainer from "./UsersLoggedContainer";
import SendChatContainer from "./SendChatContainer";
import ChatLog from "./ChatLog";
import LoadingSVG from "../svg/LoadingSVG";
// Context
export const UsernameContext = React.createContext({ username: "" });

export default function ChatPage(): JSX.Element {
  const [IsAuth, setIsAuth] = useState(false);
  const [UserInfo, setUserInfo] = useState({ username: "" });
  const [AllUserLoggedIn, setAllUserLoggedIn] = useState([]);
  const [AllMsgs, setAllMsgs] = useState([]);

  async function setSSE() {
    const sse = new EventSource("http://localhost:8080/chat/stream", {
      withCredentials: true,
    });
    sse.onmessage = (e) => {
      const dataFromServer: { users: []; msgs: [] } = JSON.parse(e.data);
      console.log("meegssgeges", dataFromServer);
      setAllUserLoggedIn(dataFromServer.users);
      setAllMsgs(dataFromServer.msgs);
    };
    sse.onerror = (err) => {
      sse.close();
    };
  }

  useEffect(() => {
    async function CheckAuth() {
      try {
        const JWToken = document.cookie.split("=")[1];
        const response = await fetch("/user/auth", {
          method: "POST",
          headers: { authorization: `Bearer ${JWToken}` },
        }).then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res;
        });
        const cookieUsernameObj = await response.json();
        setUserInfo(cookieUsernameObj);
        await setSSE();
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      }
    }
    CheckAuth();
  }, []);

  if (IsAuth === true) {
    return (
      <div>
        <div id="chatContainer">
          <UsernameContext.Provider value={UserInfo}>
            <UsersLoggedContainer allUsersArray={AllUserLoggedIn} />
            <SendChatContainer />
            <ChatLog allMsgArray={AllMsgs} />
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
