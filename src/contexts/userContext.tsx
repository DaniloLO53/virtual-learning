"use client"

import { SignUpData, SignInData, UserData } from '@/interfaces/user/UserData';
import { createContext, ReactElement, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { fetchData } from '@/services/fetchData';

type Role = 'student' | 'teacher';
interface UserContext {
  userData: UserData;
  setUserData: any;
  signUpHandler: any;
  signInHandler: (SignInData: SignInData, role: Role) => any;
  signOutHandler: any;
}


const UserContext = createContext<UserContext | null>(null);

export function useUserContext(): UserContext {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children }: any): ReactElement {
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    courses: [],
    email: '',
    access_token: ''
  });
  const router = useRouter();

  async function signUpHandler(signUpData: SignUpData) {
    const PATH = '/auth/sign-up';
    await fetchData(PATH, 'post', signUpData);
    router.push('/sign-in');
  }

  async function signInHandler(signInData: SignInData, role: Role) {
    const PATH = '/auth/sign-in';
    const data = await fetchData(PATH, 'post', signInData, role);

    console.log('LOGIN', data)
  
    localStorage.setItem('access_token', JSON.stringify(data.access_token));
    localStorage.setItem('role', JSON.stringify(data.role));
    setUserData({ ...userData, access_token: data.access_token });
    router.push('/home');
  }

  async function signOutHandler() {
    if (localStorage.getItem('access_token')) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
      setUserData({ ...userData, access_token: null });
    }
    router.replace('/sign-in');
  }

  return (
    <UserContext.Provider value={{
      setUserData,
      userData,
      signUpHandler,
      signInHandler,
      signOutHandler
    }}>
      {children}
    </UserContext.Provider>
  );
}