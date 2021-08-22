import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Navbar from "./Navbar";
import "./styles/iChat.css";

function Ichat({ socket }) {
  return (
    <div className="ichat">
      <Navbar />
      <Sidebar socket={socket} />
      <Chat socket={socket} />
    </div>
  );
}

export default Ichat;
