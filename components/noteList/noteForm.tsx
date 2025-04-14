"use client";

import React, { useState, useEffect } from "react";
import { DatePicker } from "../shared/datePicker";
import { TextField } from "../shared/textField";
import { useFeature } from "@/providers/FeatureContext";

interface FormState {
  title: string;
  description: string;
  createdAt: string;
  deadlineDate: string;
}

export function NoteForm() {
  const { addFeature, editFeature, isEditing, editingFeature, cancelEdit } =
    useFeature();
  const [formState, setFormState] = useState<FormState>({
    title: "",
    description: "",
    createdAt: "",
    deadlineDate: "",
  });
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    createdAt?: string;
    deadlineDate?: string;
  }>({});

  useEffect(() => {
    if (isEditing && editingFeature) {
      setFormState({
        title: editingFeature.title || "",
        description: editingFeature.description || "",
        createdAt: editingFeature.createdDate || "",
        deadlineDate: editingFeature.deadline || "",
      });
    } else {
      setFormState({
        title: "",
        description: "",
        createdAt: "",
        deadlineDate: "",
      });
    }
    setErrors({});
  }, [isEditing, editingFeature]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (!formState.title.trim()) {
      newErrors.title = "موضوع الزامی است";
      isValid = false;
    }

    if (!formState.description.trim()) {
      newErrors.description = "توضیحات الزامی است";
      isValid = false;
    }

    if (!formState.createdAt) {
      newErrors.createdAt = "تاریخ ثبت الزامی است";
      isValid = false;
    }

    if (!formState.deadlineDate) {
      newErrors.deadlineDate = "تاریخ ددلاین الزامی است";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const feature = {
        id:
          isEditing && editingFeature
            ? editingFeature.id
            : Date.now().toString(),
        title: formState.title,
        description: formState.description,
        createdDate: formState.createdAt,
        deadline: formState.deadlineDate,
      };

      if (isEditing) {
        editFeature(feature);
      } else {
        addFeature(feature);
      }

      setFormState({
        title: "",
        description: "",
        createdAt: "",
        deadlineDate: "",
      });
      setErrors({});
    }
  };

  const handleChange = (field: keyof FormState) => (value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <TextField
            id="title"
            name="title"
            label="موضوع"
            value={formState.title}
            onChange={handleChange("title")}
            error={errors.title}
            placeholder="عنوان کار را وارد کنید"
            maxLength={100}
            autoComplete="off"
          />

          <TextField
            id="description"
            name="description"
            label="توضیحات"
            value={formState.description}
            onChange={handleChange("description")}
            type="textarea"
            error={errors.description}
            placeholder="توضیحات کار را وارد کنید"
            maxLength={500}
          />

          <div className="sm:col-span-2">
            <div className="flex flex-col sm:flex-row justify-around gap-x-4 gap-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="createdAt"
                  className="block text-sm/6 font-semibold text-gray-200 mb-1"
                >
                  تاریخ ثبت :
                </label>
                <DatePicker
                  value={formState.createdAt}
                  onChange={handleChange("createdAt")}
                />
                {errors.createdAt && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.createdAt}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="deadlineDate"
                  className="block text-sm/6 font-semibold text-gray-200 mb-1"
                >
                  تاریخ ددلاین :
                </label>
                <DatePicker
                  value={formState.deadlineDate}
                  onChange={handleChange("deadlineDate")}
                />
                {errors.deadlineDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.deadlineDate}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex gap-4">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isEditing ? "ثبت ویرایش" : "اضافه کردن"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="block w-full rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-gray-500"
            >
              لغو ویرایش
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
