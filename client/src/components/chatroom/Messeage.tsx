import React from "react";
import OneV from "../svg/OneV";
import Tip from "../svg/Tip";
type MesseageProps = {
  msgAuthor: string;
  msgText: string;
  msgTime: string;
  classOfCreator: string;
};

export default function Messeage(props: MesseageProps) {
  function showAuthor(): JSX.Element | null {
    if (props.msgAuthor === "Server") {
      return null;
    }
    const randNum = Math.floor(Math.random() * 10) + 1;
    const colorClass: string = `color${randNum}`;

    return (
      <>
        <span className="Tip">
          <Tip />
        </span>
        <p className={`MsgAuthor ${colorClass}`}>{props.msgAuthor}</p>
        <span className="MsgTime">
          <OneV />
        </span>
      </>
    );
  }
  return (
    <div className={props.classOfCreator}>
      {showAuthor()}
      <p className="MsgText">{props.msgText}</p>
      <p className="MsgTime">{props.msgTime}</p>
    </div>
  );
}
