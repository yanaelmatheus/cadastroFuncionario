import React, { createContext, useContext, ReactNode } from 'react';

interface MyContextType {
  basename: string;
  // outros valores que você deseja incluir no contexto
}

const MyContext = createContext<MyContextType | null>(null);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const contextValue: MyContextType = {
    basename: '/my-base-url', // Defina o valor padrão para basename
    // outros valores
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === null) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};