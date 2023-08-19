'use client'

import Button from '@/components/Button';
import { TopBar } from '@/components/TopBar';
import { UserCourses } from '@/components/UserCourses';
import { useUserContext } from '@/contexts/userContext';
import axios from 'axios';
import React, { useEffect } from 'react';

export default function Home() {
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    const TOKEN_KEY = localStorage.getItem('access_token');
    let TOKEN: string = TOKEN_KEY ? JSON.parse(TOKEN_KEY) : '';
      
    async function loadUserCourses() {
      const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + '/courses';
      const config = {
        headers: {
          role: 'teacher',
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

  return (
    <div className='flex justify-center'>
      <UserCourses
        courses={ userData.courses }
      />
    </div>
  )
}