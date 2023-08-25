import React from 'react';
import "../styles/Download.css"
import Image from "../images/Download.png";

function Download() {
    return(
        <div className="Download-container">
            <label className="download-button" htmlFor="file-input">
        <img src={Image} alt="Upload" />
      </label>
        </div>
    )
}
export default Download;