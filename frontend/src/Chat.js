import React, { useEffect, useRef, useState } from "react";
import "./styles/chat.css";
import HdrStrongOutlinedIcon from "@material-ui/icons/HdrStrongOutlined";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import ImageSearchOutlinedIcon from "@material-ui/icons/ImageSearchOutlined";
import FiberSmartRecordOutlinedIcon from "@material-ui/icons/FiberSmartRecordOutlined";
import FilterCenterFocusOutlinedIcon from "@material-ui/icons/FilterCenterFocusOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import Message from "./components/Message";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";
import { selectChatId, selectChatName } from "./features/chatSlice";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function Chat({ socket }) {
  const messageEl = useRef(null);

  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const getConversation = (chatId) => {
    if (chatId) {
      socket.emit("switchRoom", chatId);
      socket.on("getChat", (res) => {
        setMessages(res);
      });
    }
  };

  const scrollToBottom = () => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  };

  useEffect(() => {
    getConversation(chatId);
    scrollToBottom();
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!input) return;

    socket.emit("sendMessage", {
      id: chatId,
      message: input,
      timestamp: Date.now(),
      user: user,
    });

    scrollToBottom();
    setInput("");
  };

  return (
    <div className="chat__area">
      {/*  */}
      <div className="chat__header">
        <div className="left_side">
          <HdrStrongOutlinedIcon />
          <p>iChat : {chatName}</p>
        </div>
        <div className="right_side">
          <VideocamOutlinedIcon />
          <CallOutlinedIcon />
          <ImageSearchOutlinedIcon />
          <FiberSmartRecordOutlinedIcon />
          <FilterCenterFocusOutlinedIcon />
        </div>
      </div>
      {/*  */}
      <div className="chat__content" ref={messageEl}>
        {/* Message */}
        <FlipMove>
          {messages.map(({ user, _id, message, timestamp }) => (
            <Message
              key={_id}
              id={_id}
              sender={user}
              message={message}
              timestamp={timestamp}
            />
          ))}
        </FlipMove>
        {/* End message */}
      </div>

      {/*  */}
      <div className="chat__input">
        <div className="input__field">
          <ImageOutlinedIcon />
          <MicNoneOutlinedIcon />
          <EmojiEmotionsOutlinedIcon />
          <div className="input">
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder={`${chatName ? "@" + chatName : ""}`}
              />
              <button type="submit" disabled={!input} onClick={sendMessage}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default Chat;
