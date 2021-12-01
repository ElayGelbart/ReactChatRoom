import React, { useRef } from "react";
import SendIcon from "@mui/icons-material/Send";

export default function SendChatContainer() {
  const UserMsgInput = useRef(null);
  async function sendMsgToServer() {
    try {
      const UserMsgInputValue = UserMsgInput.current.value;
      const response = await fetch("/chat/new/msg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msgText: UserMsgInputValue,
          msgAuthor: "Elay Gelbart",
        }),
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div id="SendChatContainer">
      <div id="inputChatDiv">
        <input
          ref={UserMsgInput}
          id="inputSendChat"
          type="text"
          placeholder="Type Something..."
        />
      </div>
      <SendIcon
        onClick={() => {
          sendMsgToServer();
        }}
        color="primary"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
