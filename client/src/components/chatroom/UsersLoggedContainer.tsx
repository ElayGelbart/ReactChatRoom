import React, { useContext, useEffect, useState } from "react";
import UsernameLogged from "./UsernameLogged";
import { UsernameContext } from "./ChatPage";

type UsersLoggedContainerProps = {
  allUsersArray: { username: string }[];
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
      UsersArrayJSX.push(<UsernameLogged username={user.username} />);
    }
    setUserLoggedList(UsersArrayJSX);
  }, [props]);

  return (
    <>
      <p>User Logged:</p>
      {UserLoggedList}
    </>
  );
}
