import { useState } from 'react';

export const useLocalStorage = () => {
  const [lastAutoSave, setLastAutoSave] = useState(null);

  // Auto-save current state to localStorage
  const autoSaveState = (state) => {
    try {
      const timestamp = new Date().toISOString();
      const currentState = {
        ...state,
        lastAutoSave: timestamp,
      };
      localStorage.setItem("billReportAutoSave", JSON.stringify(currentState));
      setLastAutoSave(timestamp);
    } catch (error) {
      console.error("Failed to auto-save state:", error);
    }
  };

  // Load auto-saved state from localStorage
  const loadAutoSavedState = () => {
    try {
      const savedState = localStorage.getItem("billReportAutoSave");
      if (savedState) {
        const state = JSON.parse(savedState);
        // Load the auto-save timestamp
        if (state.lastAutoSave) {
          setLastAutoSave(state.lastAutoSave);
        }
        return state;
      }
      return null;
    } catch (error) {
      console.error("Failed to load auto-saved state:", error);
      return null;
    }
  };

  // Load history data from localStorage
  const loadHistoryData = () => {
    try {
      const savedHistory = localStorage.getItem("billReportHistory");
      if (savedHistory) {
        return JSON.parse(savedHistory);
      }
      return [];
    } catch (error) {
      console.error("Failed to load history data:", error);
      return [];
    }
  };

  // Save current state to history (localStorage only)
  const saveToHistory = (historyItem, historyData) => {
    // Check if an item with the same sessionId already exists
    const existingIndex = historyData.findIndex(item => item.sessionId === historyItem.sessionId);
    
    let updatedHistory;
    if (existingIndex !== -1) {
      // Update existing item
      updatedHistory = [...historyData];
      updatedHistory[existingIndex] = historyItem;
    } else {
      // Add new item at the beginning
      updatedHistory = [historyItem, ...historyData];
    }

    try {
      localStorage.setItem("billReportHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    } catch (error) {
      console.error("Failed to save history:", error);
      return historyData;
    }
  };

  // Delete history item
  const deleteHistoryFromStorage = (itemId, historyData) => {
    const updatedHistory = historyData.filter((item) => item.id !== itemId);
    try {
      localStorage.setItem("billReportHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    } catch (error) {
      console.error("Failed to delete history item:", error);
      return historyData;
    }
  };

  return {
    autoSaveState,
    loadAutoSavedState,
    loadHistoryData,
    saveToHistory,
    deleteHistoryFromStorage,
    lastAutoSave,
  };
};