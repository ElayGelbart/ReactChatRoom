import React from "react";

export default function Messeage(props) {
  return (
    <div className={props.classOfCreator}>
      <span class="Tip">
        <svg viewBox="0">
          <path
            opacity=".13"
            fill="currentColor"
            d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"
          ></path>
          <path
            fill="currentColor"
            d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"
          ></path>
        </svg>
      </span>
      <p className="MsgAuthor">{props.msgAuthor}</p>
      <p className="MsgTesxt">{props.msgText}</p>
      <p className="MsgTime">{props.msgTime}</p>
    </div>
  );
}
