"use client"

import axios from 'axios';
import * as React from 'react';

export default function Groups({ params }: any) {
  async function loadCourse() {
    const { courseId } = params;
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + `/courses/${courseId}/registration`;
    const config = {
      headers: {
        role: 'student',
        authorization: 'Bearer ' + TOKEN
      },
    }
    try {
      const { data } = await axios.get(URL, { ...config });
      // setCourseInfos(data);
      console.log('Data:', data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  React.useEffect(() => {
    // loadCourse();
  }, [])
  return (
    <div>
      oi
    </div>
  )
}