import React from "react";
import "./Prepare.css";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Prepare({ advanceScene, connections }) {
  console.log(connections);

  connections = [true, true, true, true];

  return (
    <div className="Prepare">
      <h1>Place headset on participant</h1>

      <div>
        <h2>Connection status</h2>
        <div className="connections">
          {connections.map((connection, i) => (
            <div
              key={i}
              className={classNames("connection", connection && "active")}
            />
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={advanceScene}
          disabled={!connections.every(connection => connection)}
        >
          <FontAwesomeIcon icon="play" />
        </button>
      </div>
    </div>
  );
}

export default Prepare;
