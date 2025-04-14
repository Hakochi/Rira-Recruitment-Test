"use client";

import React from "react";
import { NoteForm } from "./noteForm";
import { NoteList } from "./noteList";

export function Notes() {
  return (
    <div className="p-4 md:max-w-7xl md:mx-auto">
      <NoteForm />
      <NoteList />
    </div>
  );
}
