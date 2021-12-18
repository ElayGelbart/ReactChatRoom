import { useRef, useContext } from "react";
import SendIcon from "@mui/icons-material/Send";
import { UsernameContext } from "./ChatPage";
import Messeage from "./Messeage";
import ClockSVG from "../svg/Clock";
import extractHNMfromISO from "../../utils/extractHNMfromISO";

interface SendChatProps {
  setMsgComponents: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

export default function SendChatContainer(props: SendChatProps) {
  const UserMsgInput = useRef<HTMLInputElement>(null);
  const { username } = useContext(UsernameContext);

  async function sendMsgToServer() {
    try {
      if (UserMsgInput.current === null) {
        throw UserMsgInput;
      }
      const UserMsgInputValue = UserMsgInput.current.value;
      const JWToken = document.cookie.split("=")[1];
      props.setMsgComponents((prevState) => {
        const ISOtimeNOW = new Date().toISOString().toString();
        return [
          ...prevState,
          <Messeage
            msgAuthor={username}
            msgText={UserMsgInputValue}
            msgTime={extractHNMfromISO(ISOtimeNOW)}
            classOfCreator="myMsg Msg"
            seenIndicator={<ClockSVG />}
            colorNum={10}
          />,
        ];
      });
      await fetch("/chat/new/msg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JWToken}`,
        },
        body: JSON.stringify({
          msgText: UserMsgInputValue,
          msgAuthor: username,
        }),
      });

      UserMsgInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  }

  const EnterKeySendMsg = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMsgToServer();
    }
  };
  return (
    <div id="SendChatContainer">
      <div id="inputChatDiv">
        <input
          ref={UserMsgInput}
          id="inputSendChat"
          type="text"
          placeholder="Type Something..."
          onKeyDown={(e) => {
            EnterKeySendMsg(e);
          }}
        />
      </div>
      <SendIcon
        onClick={() => {
          sendMsgToServer();
        }}
        color="primary"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
