import React, { useState } from "react";
import "../styles/Upload.css"
import plusImage from "../images/Plus.png";

function Upload() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }

  async function uploadToCloudinary() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append(
      "resource_type",
      file.type.includes("audio") ? "audio" : "video"
    );

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUrl(data.secure_url);
        console.log("Uploaded URL:", data.secure_url);
      } else {
        console.error("Error uploading file to Cloudinary. Status:", response.status);
      }
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
    }
  }

  return (
    <div className="upload-container">
      <input
        className="file-input"
        type="file"
        accept="audio/*, video/*"
        onChange={handleFileChange}
      />
      <label className="upload-button" htmlFor="file-input">
        <img src={plusImage} alt="Upload" />
      </label>
  
      {url && (
        <div>
          {file.type.includes("audio") ? (
            <audio controls>
              <source src={url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <video controls>
              <source src={url} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          )}
        </div>
      )}
    </div>
  );
}

export default Upload;
