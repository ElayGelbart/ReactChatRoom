import React, { useEffect, useState } from "react";
import "./chatroom.css";
import UsersLoggedContainer from "./UsersLoggedContainer";
import SendChatContainer from "./SendChatContainer";
import ChatLog from "./ChatLog";
export const UsernameContext = React.createContext();

export default function ChatPage(props) {
  const [IsAuth, setIsAuth] = useState(false);
  const [UserInfo, setUserInfo] = useState(null);
  const [AllUserLoggedIn, setAllUserLoggedIn] = useState(null);
  const [AllMsgs, setAllMsgs] = useState(null);

  function setSSE() {
    const JWToken = document.cookie.split("=")[1];
    const sse = new EventSource("http://localhost:8080/chat/stream", {
      authorizationHeader: `Bearer ${JWToken}`,
    });
    sse.onmessage = (e) => {
      const dataFromServer = JSON.parse(e.data);
      setAllUserLoggedIn(dataFromServer.users);
      setAllMsgs(dataFromServer.msgs);
    };
  }

  useEffect(() => {
    async function CheckAuth() {
      try {
        const JWToken = document.cookie.split("=")[1];
        const response = await fetch("/users/auth", {
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
        setSSE();
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
      <p>Not Auth</p>
    </div>
  );
}
