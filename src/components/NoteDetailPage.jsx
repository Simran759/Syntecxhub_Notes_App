import React, { useState, useEffect, useRef } from "react";
import PasswordModal from "./PasswordModal.jsx";
import { verifyPassword } from "../utils/HashPassword.js";

function NoteDetailPage({
  note,
  onUpdate,
  onDelete,
  onLockNote,
  onUnlockNote,
  onBackClick,
}) {
  const [draftText, setDraftText] = useState(note.text);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordModalMode, setPasswordModalMode] = useState("set"); 
  const [isVerified, setIsVerified] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);


  const shouldShowContent = !note.isLocked || isVerified;

  const handleSave = () => {
    if (draftText.trim()) {
      onUpdate(note.id, draftText);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    const ok = window.confirm("Delete this note permanently?");
    if (ok) {
      onDelete(note.id);
      onBackClick();
    }
  };

  const handleCancel = () => {
    setDraftText(note.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  
  const handleLockToggle = () => {
    if (note.isLocked) {
     
      onUnlockNote(note.id);
      setIsVerified(false);
    } else {
      
      setPasswordModalMode("set");
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = (password) => {
    if (passwordModalMode === "set") {
     
      onLockNote(note.id, password);
      setShowPasswordModal(false);
      setIsVerified(true);
    } else {
      
      if (verifyPassword(password, note.passwordHash)) {
        setIsVerified(true);
        setShowPasswordModal(false);
      } else {
        alert("Incorrect password. Please try again.");
      }
        
    }
  };

  
  if (note.isLocked && !isVerified) {
    return (
      <div className="app-root">
        <div className="detail-page">
          <header className="detail-header">
            <button className="detail-back-btn" onClick={onBackClick}>
              ← Back
            </button>
            <div className="detail-title-area">
              <h1 className="detail-title">🔒 Locked Note</h1>
            </div>
          </header>

          <main className="detail-main">
            <div className="detail-card locked-state">
              <div className="locked-message">
                <div className="lock-icon">🔒</div>
                <p>This note is password protected</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setPasswordModalMode("verify");
                    setShowPasswordModal(true);
                  }}
                >
                  🔓 Unlock with Password
                </button>
              </div>
            </div>
          </main>

          {showPasswordModal && (
            <PasswordModal
              mode={passwordModalMode}
              onSubmit={handlePasswordSubmit}
              onCancel={() => setShowPasswordModal(false)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <div className="detail-page">
        <header className="detail-header">
          <button className="detail-back-btn" onClick={onBackClick}>
            ← Back
          </button>
          <div className="detail-title-area">
            <h1 className="detail-title">Note Details</h1>
          </div>
          <button
            className={`detail-lock-btn ${note.isLocked ? "locked" : ""}`}
            onClick={handleLockToggle}
            title={note.isLocked ? "Unlock note" : "Lock note"}
          >
            {note.isLocked ? "🔒" : "🔓"}
          </button>
        </header>

        <main className="detail-main">
          <div className="detail-card">
            {isEditing ? (
              <textarea
                ref={textareaRef}
                className="detail-textarea"
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <div className="detail-text">
                <p>
                  {note.text || (
                    <span className="note-card-empty">(empty note)</span>
                  )}
                </p>
              </div>
            )}

            <div className="detail-metadata">
              <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
              {note.updatedAt !== note.createdAt && (
                <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
              )}
              {note.isLocked && (
                <span className="locked-badge">🔒 Password Protected</span>
              )}
            </div>

            <div className="detail-actions">
              {isEditing ? (
                <>
                  <button className="btn btn-primary" onClick={handleSave}>
                    ✓ Save
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    ✕ Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Edit
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    🗑 Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </main>

        {showPasswordModal && (
          <PasswordModal
            mode={passwordModalMode}
            onSubmit={handlePasswordSubmit}
            onCancel={() => setShowPasswordModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default NoteDetailPage;
