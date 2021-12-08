import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

type UsernameLoggedProps = {
  username: string;
};

export default function UsernameLogged(props: UsernameLoggedProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
      <FiberManualRecordIcon color="success" sx={{ fontSize: 15 }} />
      <span>{props.username}</span>
    </div>
  );
}
