'use client'

import { UserCourses } from '@/components/UserCourses';
import { useUserContext } from '@/contexts/userContext';
import { fetchData } from '@/services/fetchData';
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const { setUserData, userData } = useUserContext();

  
  async function loadUserCourses() {
    const PATH = `/courses/${userData.role === 'student' ? 'registered' : 'created'}`;
    const coursesFromApi = await fetchData({ url: PATH });

    setUserData((prevState: any) => ({ ...prevState, courses: coursesFromApi }));
  }

  const handlePublishCourse = async () => {
    setOpen(false);

    const PATH = '/courses';

    const publishedCourse = await fetchData({
      url: PATH,
      method: 'post',
      payload: {
        title,
        description,
        code,
      }
    })

    setUserData((prevState: any) => ({ ...prevState, courses: [...prevState.courses, publishedCourse] }));
  }

  useEffect(() => {
    loadUserCourses();
  }, []);

  return (
    <Container className='pt-topBar'>
      <UserCourses
        handlePublishCourse={handlePublishCourse}
        code={code}
        setCode={setCode}
        description={description}
        setDescription={setDescription}
        title={title}
        setTitle={setTitle}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  )
}