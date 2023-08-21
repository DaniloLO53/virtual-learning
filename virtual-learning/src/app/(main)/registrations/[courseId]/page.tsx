'use client'

import Button from '@/components/Button';
import { TopBar } from '@/components/TopBar';
import { fetchData } from '@/services/useApi';
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
    <>
      <TopBar />
      <div className='w-full min-h-[calc(100vh-55px)] mt-[55px] flex justify-center'>
        <div className='w-[50%] flex justify-end'>
          <div className='w-[70%]  flex flex-col justify-start px-[30px] py-[80px]'>
            <h2 className='text-[28px] font-extrabold  pt-[40px] pb-[50px]'>{ course?.title }</h2>
            <p className=' block'>Teacher:&nbsp; &nbsp;{ course?.teacher.email }</p>
            <p className=' block'>Code:&nbsp; &nbsp;{ course?.code }</p>
            <p className='py-[16px]'>
              { course?.description}
            </p>
          </div>
        </div>
        <div className='w-[50%] flex justify-start'>
          <div className='w-[70%]  flex flex-col justify-start px-[30px] py-[120px]'>
            { course?.password && course?.registrations.length === 0 && <input
              className='p-[10px] mb-[20px] rounded-[8px] border-solid border-slate-400 border-[1px]'
              type='text'
              placeholder='Enter with password'
              value={password!}
              onChange={({ target }) => setPassword(target.value)}
            />}
            {course?.registrations.length === 0 ? <Button
              onClick={registerToCourse}
            >
              Register
            </Button> : <p>You&apos;re already registered to this course</p>}
          </div>
        </div>
      </div>
    </>
  )
}