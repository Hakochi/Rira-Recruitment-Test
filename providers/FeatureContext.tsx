"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Feature {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  deadline: string;
}

interface FeatureContextType {
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  addFeature: (feature: Feature) => void;
  deleteFeature: (id: string) => void;
  editFeature: (feature: Feature) => void;
  isEditing: boolean;
  editingFeature: Feature | null;
  startEdit: (feature: Feature) => void;
  cancelEdit: () => void;
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export function FeatureProvider({ children }: { children: ReactNode }) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);

  const addFeature = (newFeature: Feature) => {
    setFeatures((prevFeatures) => [...prevFeatures, newFeature]);
  };

  const deleteFeature = (id: string) => {
    setFeatures((prevFeatures) =>
      prevFeatures.filter((feature) => feature.id !== id)
    );
  };

  const startEdit = (feature: Feature) => {
    setIsEditing(true);
    setEditingFeature(feature);
  };

  const editFeature = (updatedFeature: Feature) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.id === updatedFeature.id ? updatedFeature : feature
      )
    );
    setIsEditing(false);
    setEditingFeature(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingFeature(null);
  };

  return (
    <FeatureContext.Provider
      value={{
        features,
        setFeatures,
        addFeature,
        deleteFeature,
        editFeature,
        isEditing,
        editingFeature,
        startEdit,
        cancelEdit,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
}

export function useFeature() {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error("useFeature must be used within a FeatureProvider");
  }
  return context;
}
