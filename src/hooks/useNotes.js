import { useState, useEffect } from "react";
import { simpleHash } from "../utils/HashPassword.js";

const STORAGE_KEY = "notes-app:v1";

function createNote(text) {
  const now = Date.now();
  return {
    id: `${now}-${Math.random().toString(36).slice(2)}`,
    text,
    createdAt: now,
    updatedAt: now,
    isLocked: false,
    passwordHash: null,
  };
}

export default function useNotes() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // NEW: track if data is loaded

  // ===== EFFECT 1: LOAD once when app mounts =====
  useEffect(() => {
    console.log("📂 Loading notes from localStorage...");
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      
      if (!raw) {
        console.log("ℹ No saved notes found in localStorage");
        setIsLoaded(true); // Mark as loaded even if empty
        return;
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        console.warn("⚠ Stored data is not an array");
        setIsLoaded(true);
        return;
      }

      const cleaned = parsed.map((n) => ({
        ...n,
        isLocked: n.isLocked ?? false,
        passwordHash: n.passwordHash ?? null,
      }));

      console.log("✓ Loaded notes:", cleaned);
      setNotes(cleaned);
      setIsLoaded(true); // Mark as loaded AFTER setting notes
    } catch (err) {
      console.error("❌ Failed to load notes from localStorage", err);
      setIsLoaded(true); // Mark as loaded even on error
    }
  }, []); // Run once on mount

  // ===== EFFECT 2: SAVE whenever notes change (ONLY after loaded) =====
  useEffect(() => {
    // Don't save until data is loaded
    if (!isLoaded) {
      console.log("⏳ Waiting for data to load before saving...");
      return;
    }

    console.log("💾 Saving notes to localStorage:", notes);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      console.log("✓ Successfully saved");
    } catch (err) {
      console.error("❌ Failed to save notes to localStorage", err);
    }
  }, [notes, isLoaded]); // Save when notes OR isLoaded changes

  const addNote = () => {
    const trimmed = newNoteText.trim();
    if (!trimmed) return;
    setNotes((prev) => [createNote(trimmed), ...prev]);
    setNewNoteText("");
  };

  const updateNote = (id, newText) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, text: newText, updatedAt: Date.now() } : n
      )
    );
    setEditingNoteId(null);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingNoteId === id) setEditingNoteId(null);
  };

  const lockNote = (id, password) => {
    const hashedPassword = simpleHash(password);
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              isLocked: true,
              passwordHash: hashedPassword,
            }
          : n
      )
    );
  };

  const unlockNote = (id) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              isLocked: false,
              passwordHash: null,
            }
          : n
      )
    );
  };

  return {
    notes,
    newNoteText,
    setNewNoteText,
    addNote,
    updateNote,
    deleteNote,
    lockNote,
    unlockNote,
    editingNoteId,
    setEditingNoteId,
    isLoaded, // EXPORT: so App can use if needed
  };
}
