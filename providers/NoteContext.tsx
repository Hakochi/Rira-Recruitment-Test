'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Note {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  deadline: string;
}

interface NoteContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  editNote: (note: Note) => void;
  isEditing: boolean;
  editingNote: Note | null;
  startEdit: (note: Note) => void;
  cancelEdit: () => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export function NoteProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const addNote = (newNote: Note) => {
    console.log('adding note');

    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id: string) => {
    console.log('deleting  note');
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    if (isEditing) {
      cancelEdit();
    }
  };

  const startEdit = (note: Note) => {
    setIsEditing(true);
    setEditingNote(note);
  };

  const editNote = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setIsEditing(false);
    setEditingNote(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingNote(null);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        isEditing,
        editingNote,
        startEdit,
        cancelEdit,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export function useNote() {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useNote must be used within a NoteProvider');
  }
  return context;
}
