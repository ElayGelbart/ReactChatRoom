import React, { useContext } from "react";
import UsernameLogged from "./UsernameLogged";
import { UsernameContext } from "./ChatPage";

export default function UsersLoggedContainer() {
  const { username } = useContext(UsernameContext);
  return (
    <>
      <p>User Logged:</p>
      <UsernameLogged username={username} />
    </>
  );
}
