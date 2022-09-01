import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useSession, signOut } from 'next-auth/react';
import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { teslaAPI } from '../../api';
import { AuthContext, authReducer } from './';

export interface UserPayload {
  name: string;
  email: string;
  role: 'admin' | 'client';
  image?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user?: UserPayload;
}

const Auth_InitialState: AuthState = {
  isAuthenticated: false
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, Auth_InitialState);

  const { data, status } = useSession();

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await teslaAPI.post<{ user: UserPayload }>(
        '/user/login',
        {
          email,
          password
        }
      );
      dispatch({ type: 'LOGIN', payload: data.user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ): Promise<string | undefined | null> => {
    try {
      const { data } = await teslaAPI.post<{ user: UserPayload }>(
        '/user/register',
        {
          name,
          email,
          password
        }
      );
      dispatch({ type: 'LOGIN', payload: data.user });
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }
      return 'Error desconocido';
    }
  };

  const handleLogout = () => {
    // Cookies.remove('authentication');
    signOut();
    dispatch({ type: 'LOGOUT' });
  };

  // [deprecated] NextAuth refactor
  // useEffect(() => {
  //   checkToken();
  // }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      console.log(data.user);

      dispatch({ type: 'LOGIN', payload: data.user as UserPayload });
    }
  }, [status, data]);

  const checkToken = async () => {
    try {
      const { data } = await teslaAPI.get<{ user: UserPayload }>('/auth');
      dispatch({ type: 'LOGIN', payload: data.user });
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, handleLogin, handleLogout, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};
