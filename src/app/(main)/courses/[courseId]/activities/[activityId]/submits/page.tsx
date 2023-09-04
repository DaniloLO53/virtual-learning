"use client"

import axios from 'axios';
import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BasicMenu from '@/components/BasicMenu';
import { fetchData } from '@/services/fetchData';
import Link from 'next/link';

interface ActivitySubmitsProps extends React.HTMLAttributes<HTMLDivElement> {
  params: {
    activityId: string;
    courseId: string;
  }
}

export default function ActivitySubmits({ params }: ActivitySubmitsProps) {
  const role = JSON.parse(localStorage.getItem('role') || '');
  const [submits, setSubmits] = React.useState<any>(null);
  const submitsNumber = submits?.length ?? 0;

  async function loadSubmits() {
    const { courseId, activityId } = params;
    const PATH = `/courses/${courseId}/activities/${activityId}/submits`;
    const submitsFromApi = await fetchData({ url: PATH });
    console.log('SUBMITS', submitsFromApi)
    setSubmits(submitsFromApi);
  }

  React.useEffect(() => {
    loadSubmits();
  }, [])
  return (
    <div className='mt-[80px] w-full flex flex-col items-center'>
      <div className='w-full flex flex-col items-center'>
        <div className='w-[60%] p-[10px] flex justify-between items-end border-b-[1px]
          border-b-purple-600'
        >
          <span className='text-[30px] text-purple-600 font-semibold'>
            Submits
          </span>
          <span className='text-purple-600 font-semibold'>
            { submitsNumber }
            &nbsp;
            { (submitsNumber === 1 || submitsNumber === 0) ? 'student' : 'students' }
          </span>
        </div>
        <ul
          className='w-[60%] divide-y divide-slate-400 flex flex-col py-[20px]'
          role='list'
        >
          {
            submits?.map(({ student, id }: any, index: number) => (
              <Link
                href={`/courses/${params.courseId}/activities/${params.activityId}/submits/${id}`}
                key={index + student.email}
                className='w-full py-[10px] px-[20px] flex items-center justify-between'
              >
                <span className=''>{ student.email }</span>
              </Link>
            ))
          }
        </ul>
      </div>
    </div>
  )
}