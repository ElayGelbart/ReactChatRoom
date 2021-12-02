import React, { useEffect, useState, useContext } from "react";
import "./chatroom.css";
import UsersLoggedContainer from "./UsersLoggedContainer";
import SendChatContainer from "./SendChatContainer";
import ChatLog from "./ChatLog";

export const Username = React.createContext();

export default function ChatPage(props) {
  const [IsAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function CheckAuth() {
      try {
        const JWToken = document.cookie.split("=")[1];
        console.log(JWToken, "cookie");
        await fetch("/users/auth", {
          method: "POST",
          headers: { authorization: `Bearer ${JWToken}` },
        }).then((res) => {
          console.log(res, "res");
          if (!res.ok) {
            throw res;
          }
          setIsAuth(true);
        });
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
          <UsersLoggedContainer />
          <SendChatContainer />
          <ChatLog />
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
