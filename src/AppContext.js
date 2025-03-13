// src/AppContext.js

import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create a custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create the provider component
export const AppProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);

  const value = {
    message,
    setMessage,
    isResponseScreen,
    setIsResponseScreen,
    messages,
    setMessages
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
