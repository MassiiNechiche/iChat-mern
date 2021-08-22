import React from "react";
import { Button } from "@material-ui/core";
import "./styles/login.css";
import { auth, provider } from "./firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login__page">
      <div className="login__panel">
        <img src="iChat.png" alt="" width="400px" className="iChat" />
        <Button variant="contained" onClick={signIn}>
          Sign In with Google{" "}
          <img
            src="https://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png"
            alt=""
            width="15px"
            className="g-logo"
          />
        </Button>
      </div>
    </div>
  );
}

export default Login;
