import React from "react";

function NoteInput({ inputRef, value, onChange, onSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit();
      }
    }
  };

  const handleClick = () => {
    if (value.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="note-input-wrapper">
      <textarea
        ref={inputRef}
        className="note-input-textarea"
        placeholder="Write a note..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
      />
      <button
        className="note-input-button"
        onClick={handleClick}
        disabled={!value.trim()}
      >
        Add
      </button>
    </div>
  );
}

export default NoteInput;
