"use client"

import axios from 'axios';
import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BasicMenu from '@/components/BasicMenu';

interface Student {
  student: {
    email: string;
  },
  id: number,
}

interface Teacher {
  email: string;
}

interface Participants {
  students: Student[],
  teacher: Teacher,
}

export default function Participants({ params }: any) {
  const role = JSON.parse(localStorage.getItem('role') || '');
  const [participants, setParticipants] = React.useState<Participants | null>(null);
  const studentsNumber = participants?.students?.length ?? 0;

  async function loadParticipants() {
    const { courseId } = params;
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string)
      + `/registrations/courses/${courseId}`;
    const config = {
      headers: {
        role,
        authorization: 'Bearer ' + TOKEN
      },
    }
    try {
      const { data } = await axios.get(URL, { ...config });
      const { registrations, teacher } = data
      console.log('regis', registrations)
      setParticipants({ students: registrations, teacher });
      console.log('Data from participants:', data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  React.useEffect(() => {
    loadParticipants();
  }, [])
  return (
    <div className='mt-[150px] w-full flex flex-col items-center'>
      <div className='w-full flex flex-col items-center'>
        <div className='w-[60%] p-[10px] flex justify-between items-end border-b-[1px]
          border-b-purple-600'>
          <h2 className='text-[30px] text-purple-600 font-semibold'>
            Teacher
          </h2>
        </div>
        <ul
          className='w-[60%] divide-y divide-slate-400 flex flex-col py-[20px]'
          role='list'
        >
          <li className='w-full p-[20px] flex items-center'>
            <span className=''>
              {
                participants?.teacher.email
              }
            </span>
          </li>
        </ul>
      </div>
      <div className='w-full flex flex-col items-center'>
        <div className='w-[60%] p-[10px] flex justify-between items-end border-b-[1px]
          border-b-purple-600'
        >
          <span className='text-[30px] text-purple-600 font-semibold'>
            Classmates
          </span>
          <span className='text-purple-600 font-semibold'>
            { studentsNumber }
            &nbsp;
            { (studentsNumber === 1 || studentsNumber === 0) ? 'student' : 'students' }
          </span>
        </div>
        <ul
          className='w-[60%] divide-y divide-slate-400 flex flex-col py-[20px]'
          role='list'
        >
          {
            participants?.students?.map(({ student, id }: Student, index: number) => (
              <li
                key={index + student.email}
                className='w-full py-[10px] px-[20px] flex items-center justify-between'
              >
                <span className=''>{ student.email }</span>
                {
                  role === 'teacher'
                  &&
                  <BasicMenu
                    registrationId={id}
                    setParticipants={setParticipants}
                    participants={participants}
                  >
                    <MoreHorizIcon
                      sx={{
                        color: 'black',
                      }}
                    />
                  </BasicMenu>
                }
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}