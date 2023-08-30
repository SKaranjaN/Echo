import React, { useState } from 'react';
import '../styles/ViewText.css';
import wavyImage from '../images/wavy.png';

function ViewText({ transcriptionText, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(transcriptionText);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit(editedText);
  };

  return (
    <div className="view-text">
      <h3>Start to transcribe your file</h3>
      <p>Click on the play button below</p>
      <div className="text-result scrollable">
        {isEditing ? (
          <>
            <div
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={handleSaveClick}
              className="edit-text"
              onInput={(e) => setEditedText(e.target.innerText)} 
            >
              {editedText}
            </div>
            <button onClick={handleSaveClick}>Save</button>
          </>
        ) : (
          <>
            <div>{transcriptionText}</div>
            <span
              className="edit-icon"
              role="img"
              aria-label="Edit"
              onClick={handleEditClick}
            >
              ✏️
            </span>
          </>
        )}
      </div>
      <img src={wavyImage} alt="Wavy" className="wavy-image" />
    </div>
  );
}

export default ViewText;
