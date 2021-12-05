import React from "react";

export default function Messeage(props) {
  return (
    <div className={props.classOfCreator}>
      <span class="Tip">
        <svg viewBox="0" width="8" height="15" class="">
          <path
            opacity=".13"
            fill="#fff"
            d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"
          ></path>
          <path
            fill="#fff"
            d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"
          ></path>
        </svg>
      </span>
      <p>{props.msgAuthor}</p>
      <p>{props.msgText}</p>
      <p>{props.msgTime}</p>
    </div>
  );
}
