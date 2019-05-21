import React from "react";
import "./Debug.css";

function Start({ websocketStatus, museStatus, name, email }) {
  return (
    <div className="Debug">
      Websocket relay <div>{websocketStatus ? "green" : "red"}</div>
      Muse <div>{museStatus ? "green" : "red"}</div>
      <div>Name {name}</div>
      <div>Email {email}</div>
    </div>
  );
}

export default Start;
