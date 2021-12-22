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
  type UserData = string;
  interface SSE {
    msgs: MsgData[];
    users: UserData[];
  }
}
