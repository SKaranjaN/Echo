import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/Play.css';
import ViewText from './ViewText';

function Play({ cloudinaryUrl, fileName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState('Welcome to Echo, click on the Play button to start transcribing');
  const [transcriptionText, setTranscriptionText] = useState('');

  const handlePlayClick = () => {
    setIsLoading(true);
    setTranscriptionStatus('Please wait...');
  
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
        if (data.transcription_text) {
          setTranscriptionText(data.transcription_text);
        } else {
          setTranscriptionText('No transcription text available.');
        }
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
    <div>
    <div className='App-components'>
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
    </div>
    <ViewText transcriptionText={transcriptionText} />
    </div>
  );
}

export default Play;
