'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useNote } from '../../providers/NoteContext';
import type { Note } from '../../providers/NoteContext';
import { NoteListItem } from './noteListItem';

export function NoteList() {
  const { notes, setNotes } = useNote();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setNotes((items: Note[]) => {
        const oldIndex = items.findIndex((item: Note) => item.id === active.id);
        const newIndex = items.findIndex((item: Note) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={notes.map((note) => note.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className='grid md:grid-cols-1 sm:grid-cols-2 gap-4 p-10 pt-28'>
          {notes.map((note) => (
            <NoteListItem key={note.id} note={note} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
