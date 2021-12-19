import React, { useContext, useEffect, useState } from "react";
import UsernameLogged from "./UsernameLogged";
import { UsernameContext } from "./ChatPage";

type UsersLoggedContainerProps = {
  allUsersArray: string[];
};

export default function UsersLoggedContainer(props: UsersLoggedContainerProps) {
  const { username } = useContext(UsernameContext);
  const [UserLoggedList, setUserLoggedList] = useState<JSX.Element[]>([
    <UsernameLogged username={username} />,
  ]);

  useEffect(() => {
    const UsersArrayJSX: JSX.Element[] = [];
    if (!props.allUsersArray) {
      return;
    }
    for (let user of props.allUsersArray) {
      if (user === username) {
        continue;
      }
      UsersArrayJSX.push(<UsernameLogged username={user} />);
    }
    setUserLoggedList(UsersArrayJSX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <div id="UsersLoggedContainer">
      <div id="MyUserLogged">{username}</div>
      {UserLoggedList}
    </div>
  );
}
