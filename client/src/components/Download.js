import React from 'react';
import "../styles/Download.css"
import Image from "../images/Download.png";

function Download() {
    return(
        <div className="Download-container">
            <label className="download-button" htmlFor="file-input">
        <img src={Image} alt="Upload" />
      </label>
      <p>Download the transcripted file here</p>
      </div>
    )
}
export default Download;