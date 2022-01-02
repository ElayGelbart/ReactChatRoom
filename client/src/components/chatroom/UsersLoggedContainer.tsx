import React, { useContext, useEffect, useState } from "react";
import UsernameLogged from "./UsernameLogged";
import { UsernameContext } from "./ChatPage";
import { useSelector } from "react-redux";

export default function UsersLoggedContainer() {
  const { username } = useContext(UsernameContext);
  const UsersState = useSelector<State.SSE, State.UserData[]>(
    (state) => state.users
  );
  const [UserLoggedList, setUserLoggedList] = useState<JSX.Element[]>([
    <UsernameLogged username={username} />,
  ]);

  useEffect(() => {
    const UsersArrayJSX: JSX.Element[] = [];
    for (let user of UsersState) {
      if (user.username === username) {
        continue;
      }
      UsersArrayJSX.push(<UsernameLogged username={user.username} />);
    }
    setUserLoggedList(UsersArrayJSX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UsersState]);

  return (
    <div id="UsersLoggedContainer">
      <div id="MyUserLogged">{username}</div>
      {UserLoggedList}
    </div>
  );
}
