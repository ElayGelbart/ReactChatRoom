import { useRef, useContext } from "react";
import SendIcon from "@mui/icons-material/Send";
import { UsernameContext } from "./ChatPage";
import { useDispatch } from "react-redux";
import { addNewMsgAction } from "../../redux/slices/dataSlices";

export default function SendChatContainer() {
  const dispatch = useDispatch();
  const UserMsgInput = useRef<HTMLInputElement>(null);
  const { username } = useContext(UsernameContext);

  async function sendMsgToServer() {
    try {
      if (UserMsgInput.current === null) {
        throw UserMsgInput;
      }
      const UserMsgInputValue = UserMsgInput.current.value;
      const JWToken = document.cookie.split("=")[1];
      const ISOtimeNOW = new Date().toISOString().toString();

      dispatch(
        addNewMsgAction({
          msgAuthor: username,
          msgText: UserMsgInputValue,
          msgTime: ISOtimeNOW,
          classOfCreator: "myMsg Msg",
          seenIndicator: true,
        })
      );

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
          placeholder="Messeage"
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
