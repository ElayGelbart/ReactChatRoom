import React, { useEffect, useState, useContext } from "react";
import Messeage from "./Messeage";
import { UsernameContext } from "./ChatPage";

export default function ChatLog() {
  const [MsgComponents, setMsgComponents] = useState(null);
  const { username } = useContext(UsernameContext);

  useEffect(() => {
    const sse = new EventSource("http://localhost:8080/chat/stream");
    sse.onmessage = (e) => {
      const MsgArray = JSON.parse(e.data);
      console.log(MsgArray, "in msg");
      const MsgJSX = [];
      for (let messeage of MsgArray) {
        const { msgAuthor, msgText, msgTime } = messeage;
        let classMsg;
        if (username === msgAuthor) {
          classMsg = "myMsg";
        }
        MsgJSX.push(
          <Messeage
            msgAuthor={msgAuthor}
            msgText={msgText}
            msgTime={msgTime}
            classOfCreator={classMsg || "otherMsg"}
          />
        );
      }
      setMsgComponents(MsgJSX);
    };
  });
  return <div id="ChatLog">{MsgComponents}</div>;
}
