import React from "react";
import "./Name.css";
import * as yup from "yup";

// TODO: refactor into button component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required()
});

function Start({ advanceScene, updateName, updateEmail, name, email }) {
  console.log(schema.isValidSync({ name, email }));
  return (
    <div className="Name">
      <h1>Participant details</h1>
      <div className="form">
        <div>Name</div>
        <div>
          <input
            type="text"
            value={name}
            onChange={({ target: { value } }) => updateName(value)}
          />
        </div>
        <div>Email</div>
        <div>
          <input
            type="text"
            value={email}
            onChange={({ target: { value } }) => updateEmail(value)}
          />
        </div>
      </div>

      <div>
        <button
          onClick={advanceScene}
          disabled={!schema.isValidSync({ name, email })}
        >
          <FontAwesomeIcon icon="play" />
        </button>
      </div>
    </div>
  );
}

export default Start;
