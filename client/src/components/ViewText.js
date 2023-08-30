import React, { useState, useEffect } from 'react';
import '../styles/ViewText.css';
import wavyImage from '../images/wavy.png';

function ViewText({ transcriptionText, onEdit, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(transcriptionText);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit(editedText);
    onSave(editedText);
  };

  const handleBlur = () => {
    if (isEditing) {
      handleSaveClick();
    }
  };

  const handleContentChange = (event) => {
    setEditedText(event.target.textContent);
  };

  useEffect(() => {
    // console.log(`ViewText (editedText): ${editedText}`);
  }, [editedText]);

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
              onBlur={handleBlur}
              onInput={handleContentChange}
              className="edit-text"
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
