import React from "react";

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
          <svg>
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
        <p className={`MsgAuthor ${colorClass}`}>{props.msgAuthor}</p>
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
