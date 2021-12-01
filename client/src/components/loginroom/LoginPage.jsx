import React from "react";
import { Link } from "react-router-dom";
import "./loginroom.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function LoginPage() {
  return (
    <div id="loginContainer">
      <h1>Login Page</h1>
      <div>
        <TextField
          id="loginInput"
          label="UserName"
          variant="outlined"
          helperText="Some important text"
        />
        <Link to="/chat" style={{ textDecoration: "none" }}>
          <Button variant="contained">Login</Button>
        </Link>
      </div>
    </div>
  );
}
