import React from "react";

type UsernameLoggedProps = {
  username: string;
};

export default function UsernameLogged(props: UsernameLoggedProps) {
  return (
    <div>
      <span>{props.username}</span>
    </div>
  );
}
