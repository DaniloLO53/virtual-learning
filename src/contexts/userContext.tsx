"use client"

import { SignUpData, SignInData, UserData } from '@/interfaces/user/UserData';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
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
  // const role =  typeof window !== 'undefined' ? JSON.parse((localStorage.getItem('role')) || 'null') : null;
  const role = JSON.parse((localStorage.getItem('role')) || 'null');
  console.log('ROL', role)
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    courses: [],
    email: '',
    first_name: '',
    last_name: '',
    access_token: '',
    role,
    gender: 'none'
  });
  const router = useRouter();

  async function signUpHandler(signUpData: SignUpData, role: Role) {
    const PATH = '/sign-up';
    await axios({
      url: (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + PATH,
      method: 'post',
      data: signUpData,
      headers: {
        role,
      }
    })
    router.push('/sign-in');
  }

  async function signInHandler(signInData: SignInData, role: Role) {
    const PATH = '/auth/sign-in';
    const { data } = await axios({
      url: (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + PATH,
      method: 'post',
      data: signInData,
      headers: {
        role,
      }
    })

    typeof window !== 'undefined' && localStorage.setItem('access_token', JSON.stringify(data.access_token));
    typeof window !== 'undefined' && localStorage.setItem('role', JSON.stringify(data.role));
    // setUserData({ ...userData, access_token: data.access_token });
    router.push('/home');
  }

  async function signOutHandler() {
    if (typeof window !== 'undefined' && localStorage.getItem('access_token')) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
      setUserData({
        id: 0,
        courses: [],
        email: '',
        first_name: '',
        last_name: '',
        access_token: '',
        role: null,
        gender: 'none'
      });
    }
    router.replace('/sign-in');
  }

  async function loadUserInfos() {
    const PATH = '/profile';

    const userInfos = await fetchData({ url: PATH });
    console.log('USERIFNOSSSS', userInfos)
    setUserData((prevState) => ({
      ...prevState,
      first_name: userInfos.first_name || '',
      last_name: userInfos.last_name || '',
      email: userInfos.email || '',
      profile_picture: userInfos.profilePictureFile,
      courses: userInfos.courses,
      registrations: userInfos.registrations,
      gender: userInfos.gender,
      role,
    }))
    console.log('userInfos', userInfos);
  }

  useEffect(() => {
    role && loadUserInfos();
  }, []);

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