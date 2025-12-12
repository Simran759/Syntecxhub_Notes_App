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
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    console.log("📂 Loading notes from localStorage...");
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      
      if (!raw) {
        console.log("ℹ No saved notes found in localStorage");
        setIsLoaded(true); 
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
      setIsLoaded(true); 
    } catch (err) {
      console.error(" Failed to load notes from localStorage", err);
      setIsLoaded(true); 
    }
  }, []); 

  
  useEffect(() => {
    
    if (!isLoaded) {
      console.log(" Waiting for data to load before saving...");
      return;
    }

    console.log("Saving notes to localStorage:", notes);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      console.log("Successfully saved");
    } catch (err) {
      console.error(" Failed to save notes to localStorage", err);
    }
  }, [notes, isLoaded]); 

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
    isLoaded, 
  };
}
