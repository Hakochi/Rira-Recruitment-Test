"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useFeature } from "../../providers/FeatureContext";
import type { Feature } from "../../providers/FeatureContext";

interface SortableItemProps {
  feature: {
    id: string;
    title: string;
    description: string;
    createdDate: string;
    deadline: string;
  };
}

const SortableItem: React.FC<SortableItemProps> = ({ feature }) => {
  const { deleteFeature, startEdit } = useFeature();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: feature.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "نامشخص";
    try {
      const date = new DateObject({
        date: dateString,
        calendar: persian,
        locale: persian_fa,
      });
      if (date.isValid) {
        return date.format("YYYY/MM/DD");
      }
      return "نامعتبر";
    } catch (error) {
      return "خطا";
    }
  };

  const getBorderColor = (deadline: string) => {
    if (!deadline) return "border-gray-600";

    try {
      const today = new DateObject({
        calendar: persian,
        locale: persian_fa,
      });
      const deadlineDate = new DateObject({
        date: deadline,
        calendar: persian,
        locale: persian_fa,
      });

      if (!deadlineDate.isValid) return "border-gray-600";

      const diffTime =
        deadlineDate.toDate().getTime() - today.toDate().getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) return "border-red-800";
      if (diffDays <= 3) return "border-blue-800";
      return "border-green-600";
    } catch (error) {
      return "border-gray-600";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`block rounded-xl border p-4 ${getBorderColor(
        feature.deadline
      )} touch-none`}
    >
      <h2 className="mt-2 font-semibold text-base sm:text-lg text-white">
        {feature.title}
      </h2>
      <p className="sm:mt-1 block text-sm sm:text-base text-gray-300">
        {feature.description}
      </p>
      <div className="flex gap-3.5 mt-2 text-sm text-gray-400">
        <p>
          <span className="font-semibold">تاریخ ثبت: </span>
          {formatDate(feature.createdDate)}
        </p>
        <p>
          <span className="font-semibold">ددلاین: </span>
          {formatDate(feature.deadline)}
        </p>
      </div>
      <div className="mt-3 flex justify-between gap-5">
        <button
          type="button"
          onClick={() => deleteFeature(feature.id)}
          className="block w-full px-6 py-2 min-w-[120px] text-center text-white bg-red-800 border border-red-800 rounded hover:bg-red-600 focus:outline-none focus:ring"
        >
          حذف
        </button>
        <button
          type="button"
          onClick={() => startEdit(feature)}
          className="block w-full px-6 py-2 min-w-[120px] text-center text-white bg-orange-800 border border-orange-800 rounded active:text-orange-600 hover:bg-transparent hover:text-orange-800 focus:outline-none focus:ring"
        >
          ویرایش
        </button>
      </div>
    </div>
  );
};

export function NoteList() {
  const { features, setFeatures } = useFeature();
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
      setFeatures((items: Feature[]) => {
        const oldIndex = items.findIndex(
          (item: Feature) => item.id === active.id
        );
        const newIndex = items.findIndex(
          (item: Feature) => item.id === over.id
        );
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
        items={features.map((feature) => feature.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid md:grid-cols-1 sm:grid-cols-2 gap-4 p-10 pt-28">
          {features.map((feature) => (
            <SortableItem key={feature.id} feature={feature} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
