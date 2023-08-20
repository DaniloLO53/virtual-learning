"use client"

import axios from 'axios';
import * as React from 'react';

interface ArticleParams {
  params: {
    articleId: string;
    courseId: string;
  }
}

export default function Article({ params }: ArticleParams) {
  async function loadCourse() {
    const { articleId } = params;
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + `/courses/${articleId}/registration`;
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
    <div className='mt-[150px] w-full flex flex-col items-center'>
      { params.articleId }
      { params.courseId }
    </div>
  )
}