import React from "react";
import Messeage from "./Messeage";
export default function ChatLog() {
  return (
    <div id="ChatLog">
      <Messeage
        classOfCreator="myMsg"
        msgAuthor="Elay Gelbart"
        msgText="Hello World"
        msgTime="14:56"
      />
      <Messeage
        classOfCreator="otherMsg"
        msgAuthor="Someone else"
        msgText="Whats App"
        msgTime="22:22"
      />
      <Messeage
        classOfCreator="otherMsg"
        msgAuthor="Someone else"
        msgText="Whats App"
        msgTime="22:22"
      />
    </div>
  );
}
