import React, { useEffect, useContext, useRef, useCallback } from "react";
import OneV from "../svg/OneV";
import Messeage from "./Messeage";
import { UsernameContext } from "./ChatPage";
import extractHNMfromISO from "../../utils/extractHNMfromISO";
import { useSelector } from "react-redux";

export default function ChatLog() {
  const { username } = useContext(UsernameContext);
  const endOfChat = useRef<HTMLDivElement>(null);
  const MsgState = useSelector<State.SSE, State.MsgData[]>(
    (state) => state.msgs
  );
  const MsgJSXelement = useCallback(() => {
    const MsgJSX: JSX.Element[] = [];
    const userColorArray: { username: string; colorNumber: number }[] = [];
    for (let messeage of MsgState) {
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
    return MsgJSX;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MsgState]);

  useEffect(() => {
    if (!endOfChat.current) {
      return;
    }
    endOfChat.current.scrollIntoView({ behavior: "smooth" });
  }, [MsgState]);

  return (
    <div id="ChatLog">
      {MsgJSXelement()}
      <div ref={endOfChat}></div>
    </div>
  );
}
