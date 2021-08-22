const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const mongoose = require("mongoose");
const mongoData = require("./mongoData");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// db config
const mongoURI =
  "mongodb+srv://admin:5sosIPplpreaYEVQ@cluster0.adckl.mongodb.net/ichat?retryWrites=true&w=majority";

/**
 * Socket connection
 */

let convo = [];
let room = [];

// Socket
io.on("connection", (socket) => {
  socket.room = "";

  const connect = mongoose
    .connect(mongoURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));

  console.log("User connected");

  // gettin conversations

  const getConvos = () => {
    mongoData.find((err, data) => {
      if (err) {
        console.log(err);
      } else {
        data.sort((b, a) => {
          return a.timestamp - b.timestamp;
        });

        room = data;

        return io.emit("getConversations", room);
      }
    });
  };

  // get roomsList
  socket.on("conversations", () => {
    getConvos();
  });

  // get full Conversation

  async function getChat(id) {
    mongoData.find({ _id: id }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        io.to(socket.room).emit("getChat", data[0].conversation);
      }
    });
  }

  socket.on("switchRoom", (newroom) => {
    // leave the current room (stored in session)
    socket.leave(socket.room);
    // join new room, received as function parameter
    socket.join(newroom);
    // update socket session room title
    socket.room = newroom;

    getChat(socket.room);
  });

  // Send Message

  socket.on("sendMessage", (data) => {
    msg = {
      conversation: {
        message: data.message,
        timestamp: data.timestamp,
        user: data.user,
      },
    };

    function resetChat() {
      getChat(socket.room);
    }

    mongoData.update(
      { _id: data.id },
      {
        $push: msg,
      },
      (err, data) => {
        if (err) {
          console.log("Error saving message");
          console.log(err);
        } else {
          resetChat();
          getConvos();
        }
      }
    );
  });

  // Add a Room

  socket.on("addRoom", ({ chatName, user }) => {
    const dbData = {
      chatName: chatName,
      conversation: [
        {
          message: `Welcome to ${chatName}`,
          timestamp: Date.now(),
          user: {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          },
        },
      ],
    };
    mongoData.create(dbData, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("successfuly created the Room");
        getConvos();
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(9000, () => console.log("server is running on port 9000"));
