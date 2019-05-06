import React from "react";
import "./Debug.css";

function Start({ websocketStatus, museStatus }) {
  return (
    <div className="Debug">
      Websocket relay <div>{websocketStatus ? "green" : "red"}</div>
      Muse <div>{museStatus ? "green" : "red"}</div>
    </div>
  );
}

export default Start;
