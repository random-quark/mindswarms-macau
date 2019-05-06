import React, { useEffect, useState } from "react";
import "./App.css";

import Start from "./scenes/Start/Start";
import Name from "./scenes/Name/Name";
import Prepare from "./scenes/Prepare/Prepare";
import Visualisation from "./scenes/Visualisation/Visualisation.jsx";
import End from "./scenes/End/End";
import Debug from "./Debug";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
library.add(faPlay);

function App() {
  const [scene, advanceScene] = useState(0);
  const [websocketStatus, setWebsocketStatus] = useState(false);
  const [museStatus, setMuseStatus] = useState(false);

  useEffect(() => {
    const receiveMessage = event => {
      const { data } = event;

      if (data === "status-alive") {
        setWebsocketStatus(true);
      }

      if (data === "status-muse-alive") {
        setMuseStatus(true);
      }
    };

    const webSocket = new WebSocket("ws://localhost:8080");
    webSocket.addEventListener("message", receiveMessage);

    return function cleanup() {
      webSocket.removeEventListener("message", receiveMessage);
    };
  });

  const next = () => advanceScene(scene + 1);

  const scenes = [
    <Visualisation advanceScene={next} />,
    <Start advanceScene={next} />,
    <Name advanceScene={next} />,
    <Prepare advanceScene={next} />,
    <End advanceScene={next} />
  ];

  // const scenes = [
  //   <Start advanceScene={next} />,
  //   <Name advanceScene={next} />,
  //   <Prepare advanceScene={next} />,
  //   <Visualisation advanceScene={next} />,
  //   <End advanceScene={next} />
  // ];

  return (
    <div className="App">
      <Debug websocketStatus={websocketStatus} museStatus={museStatus} />
      {scenes[scene]}
    </div>
  );
}

export default App;
