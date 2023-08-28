import React from "react";
import { Image } from 'cloudinary-react';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';
import "../styles/Upload.css";
import plusImage from "../images/Plus.png";

function Upload() {
  const cloudName = "dyahkvt1m";
  const uploadPreset = "ml_default";

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
  
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); 
      })
      .catch(error => {
        console.error("Error uploading to Cloudinary:", error);
      });
  }

  return (
    <div className="upload-container">
      <label htmlFor="fileInput" className="upload-button">
        <img src={plusImage} alt="Upload" />
        Choose File
      </label>
      <input
        id="fileInput"
        className="file-input"
        type="file"
        accept="audio/*, video/*"
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default Upload;
