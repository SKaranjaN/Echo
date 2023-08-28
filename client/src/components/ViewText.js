import React from 'react';
import '../styles/ViewText.css';
import wavyImage from '../images/wavy.png';

function ViewText({ transcriptionText }) {
  return (
    <div className="view-text">
      <h3>Start to transcribe your file</h3>
      <p>Click on the play button below</p>
      <div className='text-result scrollable'>{transcriptionText}</div>
      <img src={wavyImage} alt="Wavy" className="wavy-image" />
    </div>
  );
}

export default ViewText;
