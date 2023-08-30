import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/Play.css';
import ViewText from './ViewText';
import Download from './Download';
import TranscriptionPDF from './TranscriptionPDF';

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

  const handleTextChange = editedText => {
    setTranscriptionText(editedText);
  };

  const handleSaveText = () => {
    const patchData = {
      transcription_text: transcriptionText,
    };

    const transcriptionId = 123; 
    fetch(`http://127.0.0.1:5000/transcriptions/${transcriptionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchData),
    })
      .then(response => response.json())
      .then(data => {
        console.log("PATCH response:", data);
      })
      .catch(error => {
        console.error("Error in PATCH request:", error);
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
      <ViewText
        transcriptionText={transcriptionText}
        onEdit={handleTextChange}
      />
      <Download transcriptionText={transcriptionText} />
      <TranscriptionPDF transcriptionText={transcriptionText} />
      <button onClick={handleSaveText}>Save</button>
    </div>
  );
}

export default Play;
