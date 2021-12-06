import React, { useEffect, useState, useContext } from "react";
import Messeage from "./Messeage";
import { UsernameContext } from "./ChatPage";

export default function ChatLog(props) {
  const [MsgComponents, setMsgComponents] = useState(null);
  const { username } = useContext(UsernameContext);

  useEffect(() => {
    const MsgJSX = [];
    if (!props.allMsgArray) {
      return;
    }
    for (let messeage of props.allMsgArray) {
      const { msgAuthor, msgText, msgTime } = messeage;
      let msgTimeHour = msgTime.split("T")[1];
      msgTimeHour = String(String(msgTimeHour).split(".")[0])
        .split(":")
        .slice(0, 2)
        .join(":");
      let classMsg;
      if (username === msgAuthor) {
        classMsg = "myMsg";
      }
      MsgJSX.push(
        <Messeage
          msgAuthor={msgAuthor}
          msgText={msgText}
          msgTime={msgTimeHour}
          classOfCreator={`${classMsg || "otherMsg"} Msg`}
        />
      );
    }
    setMsgComponents(MsgJSX);
  }, [props]);

  return <div id="ChatLog">{MsgComponents}</div>;
}
