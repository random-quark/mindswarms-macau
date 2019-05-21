import React, { useEffect, useState } from "react";
import "./App.css";

import Start from "./scenes/Start/Start";
import Name from "./scenes/Name/Name.jsx";
import Prepare from "./scenes/Prepare/Prepare";
import Visualisation from "./scenes/Visualisation/Visualisation.jsx";
import End from "./scenes/End/End";
import Debug from "./Debug.jsx";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
library.add(faPlay);

function App() {
  const [scene, advanceScene] = useState(0);
  const [websocketStatus, setWebsocketStatus] = useState(false);
  const [museStatus, setMuseStatus] = useState(false);
  const [showDebug, setDebugActive] = useState(false);
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [connections, updateConnections] = useState([
    false,
    false,
    false,
    false
  ]);

  useEffect(() => {
    const receiveMessage = event => {
      const { data } = event;

      if (data === "status-alive") {
        setWebsocketStatus(true);
      }

      if (data === "status-muse-alive") {
        setMuseStatus(true);
      }

      if (data === "connections") {
        updateConnections([true, true, true, true]);
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
    <End advanceScene={next} name={name} email={email} />,
    <Visualisation advanceScene={next} />,
    <Prepare advanceScene={next} connections={connections} />,
    <Name
      advanceScene={next}
      updateEmail={updateEmail}
      updateName={updateName}
      name={name}
      email={email}
    />,
    <Start advanceScene={next} />
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
      <div className="debugButton" onClick={() => setDebugActive(!showDebug)} />
      {showDebug && (
        <Debug
          websocketStatus={websocketStatus}
          museStatus={museStatus}
          name={name}
          email={email}
        />
      )}
      {scenes[scene]}
    </div>
  );
}

export default App;
