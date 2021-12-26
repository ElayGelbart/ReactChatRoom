import React, { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
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
// Context
export const UsernameContext = React.createContext({ username: "" });

export default function ChatPage(): JSX.Element {
  const [IsAuth, setIsAuth] = useState(false);
  const [UserInfo, setUserInfo] = useState({ username: "" });
  const dispatch = useDispatch();

  async function setSSE() {
    const JWToken = document.cookie.split("=")[1];
    console.log(JWToken, "the token");

    fetchEventSource(`/chat/stream`, {
      headers: {
        authorization: `Bearer ${JWToken}`,
        Accept: "text/event-stream",
      },
      async onopen(response) {
        if (response.ok) {
          return;
        }
        throw response;
      },
      onmessage(e) {
        console.log(e, "e msg");
        const dataFromServer: State.SSE = JSON.parse(e.data);
        dispatch(setSSEaction(dataFromServer));
      },
      onerror(err) {
        console.log("in error");
        throw err;
      },
      onclose() {
        console.log("in close");
      },
    });
  }

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
        setUserInfo(cookieUsernameObj);
        setSSE();
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
