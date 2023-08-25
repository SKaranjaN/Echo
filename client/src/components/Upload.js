import React, { useState } from "react";
import "../styles/Upload.css";
import plusImage from "../images/Plus.png";

function Upload() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

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
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUrl(data.secure_url);
        setUploadComplete(true);
        setUploadProgress(100);
        console.log("Uploaded URL:", data.secure_url);
      } else {
        console.error(
          "Error uploading file to Cloudinary. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
    }
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
        onChange={handleFileChange}
      />

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
          {uploadProgress}% Uploaded
        </div>
      )}

      {uploadComplete && (
        <div className="upload-complete-message">Upload Complete</div>
      )}

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
