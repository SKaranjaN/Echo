import React, { useState } from 'react';
import jsPDF from 'jspdf';

import "../styles/Download.css";
import Image from "../images/Download.png";

function Download({ transcriptionText }) {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const lineHeight = 6;
    pdf.setFont("Quicksand");

    const lines = pdf.splitTextToSize(transcriptionText, pageWidth - 20); 

    let y = 20;

    lines.forEach(line => {
      if (y + lineHeight > pdf.internal.pageSize.getHeight() - 20) {
        pdf.addPage(); 
        y = 20;
      }

      pdf.text(15, y, line);
      y += lineHeight;
    });

    pdf.save('transcription.pdf');
    setIsDownloaded(true);
  };

  return (
    <div className="Download-container">
      <a
        className={`download-button ${isDownloaded ? 'hide-button' : ''}`}
        href={`data:application/pdf;base64,${btoa(transcriptionText)}`}
        download="transcription.pdf"
      >
        <img src={Image} alt="Upload" onClick={handleDownloadPDF} />
      </a>
      <p>Download pdf</p>
    </div>
  );
}

export default Download;
