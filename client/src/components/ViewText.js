import React from 'react';
import '../styles/ViewText.css';
import wavyImage from '../images/wavy.png';

function ViewText() {
    return (
        <div className="view-text">
            <h3>Click on the Play button below to start playing</h3>
            <img src={wavyImage} alt="Wavy" className="wavy-image" />
        </div>
    );
}

export default ViewText;
