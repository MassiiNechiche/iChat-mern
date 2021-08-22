import React, { useEffect, useState } from "react";
import "./styles/sidebar.css";
import { Avatar, Button } from "@material-ui/core";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import CropFreeRoundedIcon from "@material-ui/icons/CropFreeRounded";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import DonutLargeRoundedIcon from "@material-ui/icons/DonutLargeRounded";
import WifiRoundedIcon from "@material-ui/icons/WifiRounded";
import RoomItem from "./components/RoomItem";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function Sidebar({ socket }) {
  const [open, setOpen] = React.useState(false);
  const [user] = useAuthState(auth);

  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  const getChats = () => {
    socket.emit("conversations");
    socket.on("getConversations", (res) => {
      setChats(res);
    });
  };

  useEffect(() => {
    getChats();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addChat = (e) => {
    e.preventDefault();
    if (!input) return;

    const chatName = input;
    const firstMsg = `Welcome to ${chatName}`;

    if (chatName && firstMsg) {
      socket.emit("addRoom", { chatName, user });

      setInput("");
      handleClose();
    }
  };

  return (
    <div className="sidebar">
      {/*  */}
      <div className="sidebar__top">
        <div className="top__content">
          <div className="top__content__p1">
            <Avatar src={user.photoURL} />

            <p>{user.displayName}</p>
          </div>
          <div className="top__content__p2">
            <AddCircleOutlinedIcon /> Add new account
          </div>
        </div>
      </div>
      {/*  */}
      <div className="sidebar__mid">
        <div className="mid__content">
          <div className="mid__content__head">
            <div className="head__title">
              Rooms <ExpandMoreOutlinedIcon />
            </div>
            <div className="head__icons">
              <AddCircleOutlineOutlinedIcon onClick={handleClickOpen} />
              <Dialog open={open} onClose={handleClose} className="Dialog">
                <DialogContent>
                  <DialogContentText>
                    Please enter a Room name
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Room name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={addChat}>Create</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          {/*  */}
          <div className="mid__rooms">
            {/* Room Items */}
            {chats.map((chat) => {
              return (
                <RoomItem
                  key={chat._id}
                  id={chat._id}
                  chatName={chat.chatName}
                  socket={socket}
                  convo={chat.conversation}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/*  */}

      <div className="sidebar__bottom">
        <div className="bottom__content">
          <MoreHorizRoundedIcon />

          <DonutLargeRoundedIcon />
          {/* <GroupAvatars /> */}
          <div className="live">
            <WifiRoundedIcon />
            <p>LIVE</p>
          </div>

          <DashboardRoundedIcon />
          <CropFreeRoundedIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
