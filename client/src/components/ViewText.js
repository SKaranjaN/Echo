import React from 'react';
import '../styles/ViewText.css';
import wavyImage from '../images/wavy.png';

function ViewText() {
    return (
        <div className="view-text">
            <h3>Start to transcribe your file</h3>
            <img src={wavyImage} alt="Wavy" className="wavy-image" />
        </div>
    );
}

export default ViewText;
