"use client"

import { CourseTopBar } from '@/components/CourseTopBar';
import { TopBar } from '@/components/TopBar';
import axios from 'axios';
import * as React from 'react';

export interface CourseParams {
  params: {
    courseId: string;
  }
}

export default function Course({ params }: CourseParams) {
  const [courseInfos, setCourseInfos] = React.useState(null);

  async function loadCourse() {
    const { courseId } = params;
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + '/registrations';
    const config = {
      headers: {
        role: 'student',
        authorization: 'Bearer ' + TOKEN
      },
    }
    try {
      // const { data } = await axios.get(URL, { ...config });
      // console.log('Data:', data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  React.useEffect(() => {
    loadCourse();
  }, [])
  return (
    <div>
      <TopBar />
      <CourseTopBar />
    </div>
  )
}