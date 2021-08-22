import React from "react";
import "./styles/App.css";
import Ichat from "./Ichat";
import Login from "./Login";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import io from "socket.io-client";

const socket = io("http://localhost:9000");

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="app">{user ? <Ichat socket={socket} /> : <Login />}</div>
  );
}

export default App;
