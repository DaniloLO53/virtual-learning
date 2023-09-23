'use client';

import { SignUpData, SignInData } from '@/interfaces/user/UserData';
import {
  createContext,
  ReactElement,
  useContext,
  useState,
  ReactNode
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Role = 'student' | 'teacher';

export interface signOutHandlerArgs {
  setCourses: (value: any) => Promise<void>;
  setUserData: (value: any) => Promise<void>;
}
interface AuthContext {
  signUpHandler: (signUpData: SignUpData, role: Role) => Promise<void>;
  signInHandler: (signInData: SignInData, role: Role) => Promise<void>;
  signOutHandler: (setStates: signOutHandlerArgs) => Promise<void>;
  userRole: Role | null;
}

const AuthContext = createContext<AuthContext | null>(null);

export function useAuthContext(): AuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode}): ReactElement {
  const role = JSON.parse(localStorage.getItem('role') || 'null');
  const [userRole, setUserRole] = useState<Role | null>(role);
  const router = useRouter();
  if (role && role !== 'teacher' && role !== 'student') throw new Error();

  async function signUpHandler(signUpData: SignUpData, role: Role) {
    const PATH = '/sign-up';
    const url = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + PATH;

    await axios({ url, method: 'post', data: signUpData, headers: { role } });
    router.push('/sign-in');
  }

  async function signInHandler(signInData: SignInData, role: Role) {
    const PATH = '/auth/sign-in';
    const url = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + PATH;

    const { data } = await axios({
      url,
      method: 'post',
      data: signInData,
      headers: { role },
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', JSON.stringify(data.access_token));
      localStorage.setItem('role', JSON.stringify(data.role));
      setUserRole(data.role);
      router.push('/home');
    }
  }

  async function signOutHandler(setStates: signOutHandlerArgs) {
    if (typeof window !== 'undefined' && localStorage.getItem('access_token')) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
    }

    const { setCourses, setUserData } = setStates;

    setCourses([]);
    setUserData(null);
    router.replace('/sign-in');
  }

  return (
    <AuthContext.Provider
      value={{
        signUpHandler,
        signInHandler,
        signOutHandler,
        userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
