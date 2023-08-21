'use client'

import Button from '@/components/Button';
import { TopBar } from '@/components/TopBar';
import { UserCourses } from '@/components/UserCourses';
import { useUserContext } from '@/contexts/userContext';
import { fetchData } from '@/services/useApi';
import axios from 'axios';
import React, { useEffect } from 'react';

export default function Home() {
  const { userData, setUserData } = useUserContext();
  const role = JSON.parse(localStorage.getItem('role') || '');
  const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');

  async function loadUserCourses() {
    const PATH = `/courses/${role === 'student' ? 'registered' : 'created'}`;
    const coursesFromApi = await fetchData(PATH, 'get');

    setUserData({ ...userData, courses: coursesFromApi, access_token: TOKEN})
  }

  useEffect(() => {
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