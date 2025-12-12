import React, { useRef, useEffect, useState } from "react";
import NoteInput from "./components/NoteInput.jsx";
import NotesGrid from "./components/NotesGrid.jsx";
import NoteDetailPage from "./components/NoteDetailPage.jsx";
import useNotes from "./hooks/useNotes.js";

function App() {
  const {
  notes,
  newNoteText,
  setNewNoteText,
  addNote,
  updateNote,
  deleteNote,
  lockNote, // NEW
  unlockNote, // NEW
  editingNoteId,
  setEditingNoteId,
} = useNotes();




  const mainInputRef = useRef(null);

  // State to track which note is being viewed (if any)
  const [viewingNoteId, setViewingNoteId] = useState(null);

  useEffect(() => {
    if (mainInputRef.current && !viewingNoteId) {
      mainInputRef.current.focus();
    }
  }, [viewingNoteId]);

  // Find the note being viewed
  const viewingNote = notes.find((n) => n.id === viewingNoteId);

  // If viewing a note detail page, show that instead
  if (viewingNoteId && viewingNote) {
  if (viewingNoteId && viewingNote) {
  return (
    <NoteDetailPage
      note={viewingNote}
      onUpdate={updateNote}
      onDelete={deleteNote}
      onLockNote={lockNote} // NEW
      onUnlockNote={unlockNote} // NEW
      onBackClick={() => setViewingNoteId(null)}
    />
  );
}

}


  // Otherwise show the dashboard (list view)
  return (
    <div className="app-root">
      <div className="app-shell">
        <header className="app-header">
          <h1 className="app-title">📝 My Notes</h1>
          <p className="app-subtitle">
            Capture, edit, and keep your notes — stored in your browser.
          </p>
        </header>

        <main className="app-main">
          <NoteInput
            inputRef={mainInputRef}
            value={newNoteText}
            onChange={setNewNoteText}
            onSubmit={addNote}
          />

          <div className="notes-meta">
            <span>{notes.length} note{notes.length !== 1 ? "s" : ""}</span>
          </div>

          <NotesGrid
            notes={notes}
            onNoteClick={setViewingNoteId}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
