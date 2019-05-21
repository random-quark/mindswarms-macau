import React from "react";
import "./End.css";

// TODO: play a sound when complete to allow user to remove own headset

const uploadVideo = () => {
  // https://developers.google.com/youtube/v3/docs/videos/insert youtube docs

  const formData = new FormData();

  formData.append("title", "Mindswarms");
  formData.append
  

  fetch(
    "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet&access_token=YOUR_TOKEN_HERE",
    {
      method: "POST",
      body: formData
    }
  );
};

function Start({ advanceScene, name, email }) {
  return (
    <div className="End">
      <h1>Experience complete</h1>
      <div>The participant may remove the headset</div>

      <div>Uploading media</div>
      <div>
        The media has been uploaded and emailed to {name} at {email}
      </div>
    </div>
  );
}

export default Start;
