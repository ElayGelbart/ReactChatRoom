import React from "react";
import SendIcon from "@mui/icons-material/Send";

export default function SendChatContainer() {
  return (
    <div id="SendChatContainer">
      <div id="inputChatDiv">
        <input id="inputSendChat" type="text" placeholder="Type Something..." />
      </div>
      <SendIcon color="primary" style={{ cursor: "pointer" }} />
    </div>
  );
}
