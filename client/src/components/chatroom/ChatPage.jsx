import React, { useState } from "react";
import "./chatroom.css";
import UsersLoggedContainer from "./UsersLoggedContainer";
import SendChatContainer from "./SendChatContainer";
import ChatLog from "./ChatLog";

export default function ChatPage() {
  const [IsAuth, setIsAuth] = useState(false);

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
