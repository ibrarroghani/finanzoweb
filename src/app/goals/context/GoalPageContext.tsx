'use client';
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface IGoalPageContextValue {
  showUpdateModal: boolean;
  //eslint-disable-next-line
  setShowUpdateModal: (value: boolean) => void;
  showCreateModal: boolean;
  //eslint-disable-next-line
  setShowCreateModal: (value: boolean) => void;

  goalSlug: string;
  //eslint-disable-next-line
  setGoalSlug: (value: string) => void;
}

interface IGoalPageProviderProps {
  children: ReactNode;
}

// Provide a default value for the context
const defaultContextValue: IGoalPageContextValue = {
  showUpdateModal: false,
  setShowUpdateModal: () => {}, // No-op by default
  showCreateModal: false,
  setShowCreateModal: () => {}, // No-op by default
  goalSlug: '',
  setGoalSlug: () => {},
};

// Create the context with the default value
export const GoalPageContext =
  createContext<IGoalPageContextValue>(defaultContextValue);

// Custom hook to access the context
export const useGoalPageContext = () => useContext(GoalPageContext);

// Provider component
export const GoalPageProvider: React.FC<IGoalPageProviderProps> = ({
  children,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [goalSlug, setGoalSlug] = useState<string>('');

  const contextValue: IGoalPageContextValue = {
    showUpdateModal,
    setShowUpdateModal,
    showCreateModal,
    setShowCreateModal,
    goalSlug,
    setGoalSlug,
  };

  return (
    <GoalPageContext.Provider value={contextValue}>
      {children}
    </GoalPageContext.Provider>
  );
};
