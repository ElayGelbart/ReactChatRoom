import React, { useEffect, useState } from "react";
import Messeage from "./Messeage";
export default function ChatLog() {
  const [MsgComponents, setMsgComponents] = useState(null);

  useEffect(() => {
    const sse = new EventSource("http://localhost:8080/chat/stream");
    sse.onmessage = (e) => {
      const MsgArray = JSON.parse(e.data);
      console.log(MsgArray, "in msg");
      const MsgJSX = [];
      for (let messeage of MsgArray) {
        const { msgAuthor, msgText, msgTime } = messeage;
        MsgJSX.push(
          <Messeage
            msgAuthor={msgAuthor}
            msgText={msgText}
            msgTime={msgTime}
            classOfCreator="myMsg"
          />
        );
      }
      setMsgComponents(MsgJSX);
    };
  });
  return <div id="ChatLog">{MsgComponents}</div>;
}
