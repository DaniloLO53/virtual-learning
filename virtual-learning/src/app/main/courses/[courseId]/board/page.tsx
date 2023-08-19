"use client"

import axios from 'axios';
import * as React from 'react';

interface BoardParams {
  params: {
    courseId: string;
  }
}

export default function Board({ params }: BoardParams) {
  async function loadCourse() {
    const { courseId } = params;
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + `/courses/${courseId}/`;
    const config = {
      headers: {
        role: 'student',
        authorization: 'Bearer ' + TOKEN
      },
    }
    console.log('courseId', courseId)
    try {
      // const { data } = await axios.get(URL, { ...config });
      // setCourseInfos(data);
      // console.log('Data from participants:', data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  React.useEffect(() => {
    loadCourse();
  }, [])
  return (
    <div>
      oi
    </div>
  )
}