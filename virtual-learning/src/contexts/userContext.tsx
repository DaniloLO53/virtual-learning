"use client"

import { SignUpData, SignInData, UserData } from '@/interfaces/user/UserData';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie } from "cookies-next";

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
  const [userData, setUserData] = useState<UserData>({
    courses: [],
    email: '',
    access_token: ''
  });
  const router = useRouter();

  useEffect(() => {
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    async function loadUserCourses() {
      const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + '/courses';
      const config = {
        headers: {
          role: 'student',
          authorization: 'Bearer ' + TOKEN
        },
      }
      const { data } = await axios.get(URL, { ...config });

      setUserData({ ...userData, courses: data, access_token: TOKEN})
    }
    if (TOKEN.length > 0) {
      loadUserCourses();
    }
  }, [userData.courses.length, userData.access_token]);

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
  
    localStorage.setItem('access_token', JSON.stringify(data.access_token));
    setUserData({ ...userData, access_token: data.access_token });
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