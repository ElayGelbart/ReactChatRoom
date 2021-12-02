import React from "react";
import UsernameLogged from "./UsernameLogged";
export default function UsersLoggedContainer() {
  return (
    <>
      <p>User Logged:</p>
      <UsernameLogged username="Elay Gelbart" />
      <UsernameLogged username="Someone Else" />
    </>
  );
}
