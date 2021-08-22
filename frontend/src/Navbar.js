import { Avatar } from "@material-ui/core";
import React from "react";
import "./styles/navbar.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { auth } from "./firebase";
import TelegramIcon from "@material-ui/icons/Telegram";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";

function NavBar() {
  return (
    <div className="navbar">
      <Avatar className="messagin avatar">
        <TelegramIcon />
      </Avatar>
      <Avatar className="videocall avatar">
        <VideocamOutlinedIcon />
      </Avatar>
      <ExitToAppIcon className="exit" onClick={() => auth.signOut()} />
    </div>
  );
}

export default NavBar;
