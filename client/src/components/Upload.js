import React, { useState } from "react";
import "../styles/Upload.css";
import plusImage from "../images/Plus.png";
import Play from "./Play";

function Upload() {
  const cloudName = "dyahkvt1m";
  const uploadPreset = "ml_default";
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(""); 
  const [fileName, setFileName] = useState(""); 

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setUploadProgress(percentComplete);
      }
    };

    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/upload`, true);

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log("Upload complete:", data);
        setCloudinaryUrl(data.secure_url);
        setFileName(file.name);
        setUploadProgress(0);
      } else {
        console.error("Upload failed:", xhr.responseText);
      }
    };

    xhr.send(formData);
  }

  return (
    <div>
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
        <div className="progress-text">
          {uploadProgress === 100 ? "Upload done" : `${uploadProgress.toFixed(2)}%`}
        </div>
      </div>
      <div>
        <Play cloudinaryUrl={cloudinaryUrl} fileName={fileName} /> 
      </div>
    </div>
  );
}

export default Upload;