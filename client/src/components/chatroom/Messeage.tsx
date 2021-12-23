import React from "react";
import Tip from "../svg/Tip";
type MesseageProps = {
  msgAuthor: string;
  msgText: string;
  msgTime: string;
  classOfCreator: string;
  seenIndicatorJSX: JSX.Element;
  colorNum: number;
};

export default function Messeage(props: MesseageProps) {
  function showAuthor(): JSX.Element | null {
    if (props.msgAuthor === "Server") {
      return null;
    }

    return (
      <>
        <span className="Tip">
          <Tip />
        </span>
        <p className={`MsgAuthor color-${props.colorNum}`}>{props.msgAuthor}</p>
      </>
    );
  }
  return (
    <div className={props.classOfCreator}>
      {showAuthor()}
      <p className="MsgText">{props.msgText}</p>
      <p className="MsgTime">
        {props.msgTime}
        {props.seenIndicatorJSX}
      </p>
    </div>
  );
}
