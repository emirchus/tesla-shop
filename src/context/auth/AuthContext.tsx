import { createContext } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  user?: {
    name: string;
    email: string;
    image?: string;
    role: 'admin' | 'client';
  };

  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleLogout: () => void;
  handleRegister: (
    name: string,
    email: string,
    password: string
  ) => Promise<string | null | undefined>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);
