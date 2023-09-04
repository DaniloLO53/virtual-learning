'use client'

import { UserCourses } from '@/components/UserCourses';
import { useUserContext } from '@/contexts/userContext';
import { fetchData } from '@/services/fetchData';
import { Container } from '@mui/material';
import React, { useEffect } from 'react';

export default function Home() {
  const { userData, setUserData } = useUserContext();
  const role = JSON.parse(localStorage.getItem('role') || 'null');
  const TOKEN = JSON.parse(localStorage.getItem('access_token') || 'null');

  async function loadUserCourses() {
    const PATH = `/courses/${role === 'student' ? 'registered' : 'created'}`;
    const coursesFromApi = await fetchData({ url: PATH });

    setUserData({ ...userData, courses: coursesFromApi })
  }

  useEffect(() => {
    loadUserCourses();
  }, []);

  return (
    <Container className='pt-topBar'>
      <UserCourses />
    </Container>
  )
}