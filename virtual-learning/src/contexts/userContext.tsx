"use client"

import { SignUpData, SignInData, UserData } from '@/interfaces/user/UserData';
import { createContext, ReactElement, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface UserContext {
  userData: UserData;
  setUserData: any;
  signUpHandler: any;
  signInHandler: any;
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
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  async function signUpHandler(signUpData: SignUpData, role: 'student' | 'teacher') {
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + '/sign-up';
    const config = {
      headers: {
        role: role
      }
    }
    await axios.post(URL, signUpData, { ...config });
    router.push('/sign-in')
  }

  async function signInHandler(signInData: SignInData, role: 'student' | 'teacher') {
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + '/auth/sign-in';
    const config = {
      headers: {
        role: role
      }
    }
    const { data } = await axios.post(URL, signInData, { ...config });
    setUserData({ access_token: data.access_token });
    router.push('/home')
  }

  console.log('USER CONTEXT RENDERED')

  return (
    <UserContext.Provider value={{
      setUserData,
      userData,
      signUpHandler,
      signInHandler
    }}>
      {children}
    </UserContext.Provider>
  );
}