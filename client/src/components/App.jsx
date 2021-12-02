import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./loginroom/LoginPage";
import ChatPage from "./chatroom/ChatPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/chat" element={<ChatPage />}></Route>
    </Routes>
  );
}
