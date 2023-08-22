'use client'

import Button from '@/components/Button';
import { TopBar } from '@/components/TopBar';
import { fetchData } from '@/services/fetchData';
import { Box, Container, Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export interface RegistrateToCourseParams {
  params: {
    courseId: string;
  }
}

export interface RegistrateToCourseData {
  title: string;
  code: string;
  description: string;
  password: string;
  registrations: {student_id: number}[];
  teacher: { email: string };
}

export default function RegistrateToCourse(
    { params }: RegistrateToCourseParams
  ) {
  const [course, setCourse] = useState<RegistrateToCourseData | null>(null);
  let [password, setPassword] = useState<string>('');
  const router = useRouter();

  async function loadCourse() {
    const PATH = `/courses/${params.courseId}/registration`;
    const courseFromApi = await fetchData(PATH, 'get');
    setCourse(courseFromApi);
  }

  async function registerToCourse() {
    const PATH = '/registrations';
    const { courseId } = params;
    let payload: any = { course_id: Number(courseId) };
    if (course?.password) payload = { ...payload, password }

    await fetchData(PATH, 'post', payload);
    router.replace(`/courses/${courseId}/board`);
  }

  useEffect(() => {
    loadCourse();
  }, [course?.title])

  return (
    <Stack justifyContent='center' direction='row' className='pt-[50px]'>
      <Stack className='w-[60%]' direction='row' >
        <Box className='w-[70%] p-[5%] bg-purple-100'>
            <h2 className='text-[28px] font-extrabold  pt-[40px] pb-[50px]'>{ course?.title }</h2>
            <p className=' block'>Teacher:&nbsp; &nbsp;{ course?.teacher.email }</p>
            <p className=' block'>Code:&nbsp; &nbsp;{ course?.code }</p>
            <p className='py-[16px]'>
              { course?.description}
            </p>
        </Box>
        <Box className='bg-green-100'>
            { course?.password && course?.registrations.length === 0 && <input
              className='p-[10px] mb-[20px] rounded-[8px] border-solid border-slate-400 border-[1px]'
              type='text'
              placeholder='Password'
              value={password!}
              onChange={({ target }) => setPassword(target.value)}
            />}
            {course?.registrations.length === 0 ? <Button
              onClick={registerToCourse}
            >
              Register
            </Button> : <p>You&apos;re already registered to this course</p>}
        </Box>
      </Stack>
    </Stack>
  )
}