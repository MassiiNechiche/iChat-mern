import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";

const Message = forwardRef(({ id, sender, message, timestamp }, ref) => {
  const [user] = useAuthState(auth);

  return (
    <div
      className={`chat__message ${
        user.email === sender.email && "message_sent"
      }`}
      ref={ref}
    >
      <Avatar src={sender.photoURL} />
      <div className="message__info">
        <p className="message__sender">{sender.displayName}</p>
        <p className="message__content">{message}</p>
      </div>
      <span>{new Date(parseInt(timestamp)).toDateString()}</span>
    </div>
  );
});

export default Message;
