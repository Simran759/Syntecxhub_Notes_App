import React from "react";

function formatDateTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleString();
}

function NoteCard({ note }) {
  if (!note) return null;

  return (
    <article className={`note-card ${note.isLocked ? "note-card-locked" : ""}`}>
      {/* Lock badge on top-right */}
      {note.isLocked && <div className="note-lock-badge">🔒</div>}

      <div className="note-card-body">
        <p className="note-card-text">
          {note.text || (
            <span className="note-card-empty">(empty note)</span>
          )}
        </p>
      </div>

      <footer className="note-card-footer">
        <div className="note-card-dates">
          <span className="note-card-date">
            {formatDateTime(note.createdAt)}
          </span>
        </div>
      </footer>
    </article>
  );
}

export default NoteCard;
