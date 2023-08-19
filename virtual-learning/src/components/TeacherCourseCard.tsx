'use client'

import { useRouter } from 'next/navigation';
import * as React from 'react';

export const TeacherCourseCard = ({ course }: any) => {
  const { title, code, id } = course;
  const router = useRouter();

  function handleGoToCourse() {
    router.replace(`/main/courses/${id}/board`);
  }

  return (
    <button
      className='p-[15px]'
      type='button'
      onClick={handleGoToCourse}
    >
      <div className='w-[40%] flex flex-col items-start'>
        <h2 className='w-full text-[20px] truncate text-left'>
          { title }
        </h2>
        <p className='text-[12px]'>
          { code }
        </p>
      </div>
    </button>
  )
}