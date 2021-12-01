import React from "react";

export default function Messeage(props) {
  return (
    <div className={props.classOfCreator}>
      <p>{props.msgAuthor}</p>
      <p>{props.msgText}</p>
      <p>{props.msgTime}</p>
    </div>
  );
}
