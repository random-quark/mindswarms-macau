import React, { useEffect } from "react";
import "./Start.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Start({ advanceScene }) {
  return (
    <div className="Start">
      <h1>Mindswarms</h1>
      <div>
        <FontAwesomeIcon icon="play" onClick={advanceScene} />
      </div>
    </div>
  );
}

export default Start;
