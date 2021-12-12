import React, { useEffect, useState, useContext } from "react";
import Messeage from "./Messeage";
import { UsernameContext } from "./ChatPage";

type ChatLogProps = {
  allMsgArray: { msgAuthor: string; msgText: string; msgTime: string }[];
};

export default function ChatLog(props: ChatLogProps) {
  const [MsgComponents, setMsgComponents] = useState<JSX.Element[]>([]);
  const { username } = useContext(UsernameContext);

  useEffect(() => {
    const MsgJSX: JSX.Element[] = [];
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
      let classMsg: string = "";
      if (username === msgAuthor) {
        classMsg = "myMsg";
      } else if (msgAuthor === "Server") {
        classMsg = "serverMsg";
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
