import React, { useEffect, useContext, useRef } from "react";
import OneV from "../svg/OneV";
import Messeage from "./Messeage";
import { UsernameContext } from "./ChatPage";
import extractHNMfromISO from "../../utils/extractHNMfromISO";
type ChatLogProps = {
  allMsgArray: State.AllMsgInterface;
  MsgComponents: JSX.Element[] | [];
  setMsgComponents: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
};

export default function ChatLog(props: ChatLogProps) {
  const { username } = useContext(UsernameContext);
  const endOfChat = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const MsgJSX: JSX.Element[] = [];
    if (!props.allMsgArray) {
      return;
    }
    const userColorArray: { username: string; colorNumber: number }[] = [];
    for (let messeage of props.allMsgArray) {
      let colorNum: number = 10;
      const { msgAuthor, msgText, msgTime } = messeage;
      let msgTimeHour = extractHNMfromISO(msgTime);
      let classMsg: string = "";
      if (username === msgAuthor) {
        classMsg = "myMsg";
      } else if (msgAuthor === "Server") {
        classMsg = "serverMsg";
      } else {
        const userObj = userColorArray.find(
          (userObj) => userObj.username === msgAuthor
        );
        if (userObj) {
          colorNum = userObj.colorNumber;
        } else {
          const randNum = Math.floor(Math.random() * 9) + 1;
          colorNum = randNum;
          userColorArray.push({ username: msgAuthor, colorNumber: colorNum });
        }
      }
      MsgJSX.push(
        <Messeage
          msgAuthor={msgAuthor}
          msgText={msgText}
          msgTime={msgTimeHour}
          classOfCreator={`${classMsg || "otherMsg"} Msg`}
          seenIndicator={<OneV />}
          colorNum={colorNum}
        />
      );
    }
    props.setMsgComponents(MsgJSX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.allMsgArray]);

  useEffect(() => {
    if (!endOfChat.current) {
      return;
    }
    endOfChat.current.scrollIntoView({ behavior: "smooth" });
  }, [props.MsgComponents]);

  return (
    <div id="ChatLog">
      {props.MsgComponents}
      <div ref={endOfChat}></div>
    </div>
  );
}
