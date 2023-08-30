import React, { useState, useRef } from 'react';
import '../styles/ViewText.css';
import wavyImage from '../images/wavy.png';

function ViewText({ transcriptionText, onEdit, onSave, isLoading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(transcriptionText);
  const contentEditableRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit(editedText);
    onSave(editedText);
  };

  const handleBlur = () => {
    handleSaveClick();
  };

  const handleContentChange = (event) => {
    setEditedText(event.target.textContent);
  };

  return (
    <div className="view-text">
      <h3>Start to transcribe your file</h3>
      {isLoading ? (
        <p>Please wait...</p>
      ) : (
        <p>Click on the play button below</p>
      )}
      <div className="text-result scrollable">
        {isEditing ? (
          <div
            ref={contentEditableRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={handleContentChange}
            onBlur={handleBlur}
            className="edit-text"
          >
            {transcriptionText}
          </div>
        ) : (
          <div
            onClick={handleEditClick}
            style={{ cursor: 'pointer' }}
          >
            {transcriptionText}
          </div>
        )}
      </div>
      <div className="edit-button-container">
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <span
            className="edit-icon"
            role="img"
            aria-label="Edit"
            onClick={handleEditClick}
          >
            ✏️
          </span>
        )}
      </div>
      <img src={wavyImage} alt="Wavy" className="wavy-image" />
    </div>
  );
}

export default ViewText;
