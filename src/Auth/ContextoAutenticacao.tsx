import React, { createContext, useState, ReactNode, useContext } from 'react';

// Definir o tipo para o usuário
interface User {
  id: string;
  name: string;
}

interface Funcionario {
  idFuncionario: Number;
}

// Definir o tipo para o valor do contexto
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  func: Funcionario | null;
  setFuncionario: (funcionario: Funcionario) => void;
}

// Valor padrão para o contexto
const defaultContextValue: AuthContextType = {
  user: null,
  login: () => {},
  logout: () => {},
  func: null,
  setFuncionario: () => {},
};

// Criar o contexto
const AuthContext = createContext<AuthContextType>(defaultContextValue);

// Provedor de contexto
export const ContextoAutenticacao: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [func, setFunc] = useState<Funcionario | null>(null);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const setFuncionario = (funcionario: Funcionario) => {
    setFunc(funcionario);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, func, setFuncionario }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);