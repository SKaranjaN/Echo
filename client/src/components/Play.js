import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/Play.css'; 

function Play({ cloudinaryUrl, fileName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState('Welcome to Echo, click on the Play button to start transcribing');

  const handlePlayClick = () => {
    setIsLoading(true);
    setTranscriptionStatus('Please wait...');
    
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
        setTranscriptionStatus('Transcription done');
      })
      .catch(error => {
        console.error("Error in POST request:", error);
        setTranscriptionStatus('Error occurred');
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
        <p className="image-title">{transcriptionStatus}</p>
      </div>
      <button className={`play-button ${isLoading ? 'loading' : ''}`} onClick={handlePlayClick} disabled={isLoading}>
        <div className="icon-container">
          <div className="icon-wrapper">
            {isLoading ? (
              <div className="progress-indicator">
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

export default Play;
