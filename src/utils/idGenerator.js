// Utility functions for generating unique IDs

export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

export const generateBillId = () => {
  return `bill_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

export const generateHistoryId = () => {
  return `history_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};