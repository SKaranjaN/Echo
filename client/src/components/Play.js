import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/Play.css'; 

function Play({ cloudinaryUrl, fileName }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayClick = () => {
    setIsLoading(true);

    // Create the data to send in the POST request
    const postData = {
      file_name: fileName,
      file_path: cloudinaryUrl,
    };

    fetch("http://127.0.0.1:5000/uploads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(data => {
        console.log("POST response:", data);
      })
      .catch(error => {
        console.error("Error in POST request:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="play-container">
      <div className="image-title-container">
        <div className="image-holder">
          {/* This is an empty div for the background image */}
        </div>
        <p className="image-title">Welcome to Echo, click on the Play button to start transcribing</p>
      </div>
      <button className={`play-button ${isLoading ? 'loading' : ''}`} onClick={handlePlayClick} disabled={isLoading}>
        <div className="icon-container">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={isLoading ? faSpinner : faPlay} />
          </div>
        </div>
      </button>
    </div>
  );
}

export default Play;
