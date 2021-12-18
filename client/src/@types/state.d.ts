declare namespace State {
  interface ViewInterface {
    login: string;
    register: string;
  }
  interface MsgData {
    msgAuthor: string;
    msgText: string;
    msgTime: string;
    classOfCreator: string;
    seenIndicator: JSX.Element;
  }
  type AllMsgInterface = MsgData[];
}
