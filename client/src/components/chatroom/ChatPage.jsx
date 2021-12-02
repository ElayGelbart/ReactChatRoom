import React from "react";
import "./chatroom.css";
import UsersLoggedContainer from "./UsersLoggedContainer";
import SendChatContainer from "./SendChatContainer";
import ChatLog from "./ChatLog";

export default function ChatPage() {
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
