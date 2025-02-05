// src/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserCredentials = (userCredentials) => {
    console.log('User credentials:', userCredentials);  // Log para verificar o que está sendo passado
    setUser(userCredentials);
  };

  const logout = () => {
    console.log('Logging out');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUserCredentials, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};