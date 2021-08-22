import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./room_item.css";
import { setChat } from "../features/chatSlice";

function Room_item({ id, chatName, timestamp, socket, convo }) {
  const dispatch = useDispatch();
  const [lastMsg, setLastMsg] = useState("");
  const [lastPhoto, setLastPhoto] = useState("");
  const [lastTimestamp, setLastTimestamp] = useState("");

  useEffect(() => {
    convo.sort((b, a) => {
      return a.timestamp - b.timestamp;
    });

    setLastMsg(convo[0].message);
    setLastTimestamp(convo[0].timestamp);
    setLastPhoto(convo[0].user.photoURL);
  }, [id]);

  return (
    <div
      className="rooms__item"
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
    >
      <Avatar className="room__avatar" src={lastPhoto} />
      <div className="room__info">
        <h4>{chatName}</h4>
        <p>{lastMsg}</p>
      </div>

      <div className="timestamp">
        {new Date(parseInt(lastTimestamp)).toDateString()}
      </div>
    </div>
  );
}

export default Room_item;
