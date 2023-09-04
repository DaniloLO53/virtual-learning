"use client"

import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BasicMenu from '@/components/BasicMenu';
import { fetchData } from '@/services/fetchData';
import AddIcon from '@mui/icons-material/Add';
import CustomizedAccordion from '@/components/CustomizedAccordion';
import SimpleDialog from '@/components/ActivityDialog';
import ActivityDialog from '@/components/ActivityDialog';

interface Student {
  student: {
    email: string;
  },
  id: number,
}

interface Teacher {
  email: string;
}

export interface Actvity {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  course_id: number;
  updated_at: Date;
  created_at: Date
}

export default function Activities({ params }: any) {
  const role = JSON.parse(localStorage.getItem('role') || '');
  const [newActivity, setNewActivity] = React.useState<any>(null);
  const [activities, setActivities] = React.useState<Actvity[] | null>(null);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const activitiesNumber = activities?.length ?? 0;

  async function loadActivities() {
    const { courseId } = params;
    const PATH = `/courses/${courseId}/activities`;
    const activitiesFromApi = await fetchData({ url: PATH });
    console.log(activitiesFromApi)
    setActivities(activitiesFromApi);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
  };

  React.useEffect(() => {
    loadActivities();
  }, [])
  return (
    <div className='mt-[150px] w-full flex flex-col items-center'>
      <div className='w-full flex flex-col items-center'>
        <div className='w-[60%] p-[10px] flex justify-between items-end border-b-[1px]
          border-b-purple-600'
        >
          <span className='text-[30px] text-purple-600 font-semibold'>
            Activities
          </span>
          <span className='text-purple-600 font-semibold'>
            { activitiesNumber }
            &nbsp;
            { (activitiesNumber === 1 || activitiesNumber === 0) ? 'student' : 'students' }
          </span>
        </div>
        <div className='flex flex-col w-[60%]'>
          { role === 'teacher' &&
            <button
              className='p-[10px] text-purple-500 font-bold text-[22px] flex items-center'
              type='button'
              onClick={handleClickOpen}
            >
              <AddIcon />
              New activity
            </button>
          }
          <ActivityDialog
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            open={open}
            handleClose={handleClose}
          />
          <CustomizedAccordion activities={activities}/>
        </div>
      </div>
    </div>
  )
}