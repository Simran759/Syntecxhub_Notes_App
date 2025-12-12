import React from "react";
import NoteCard from "./NoteCard.jsx";

function NotesGrid({ notes, onNoteClick }) {
  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        No notes yet. Start typing above to add your first note.
      </div>
    );
  }

  return (
    <section className="notes-grid">
      {notes.map((note) => (
        <div key={note.id} onClick={() => onNoteClick(note.id)}>
          <NoteCard note={note} />
        </div>
      ))}
    </section>
  );
}

export default NotesGrid;
