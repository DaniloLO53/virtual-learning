import Image from 'next/image';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import StaticIcon from './StaticIcon';
import { Fragment } from 'react';



export interface Course {
  id: number,
  title: string;
  code: string;
  teacher: {
    email: string;
  };
  activities: {
    deadline: string;
    title: string;
    activities_done: any[]
  }[]
}

interface StudentCourseCardProps {
  course: Course
}

export const StudentCourseCard = ({ course }: StudentCourseCardProps) => {
  const { title, teacher, id } = course;

  function formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const mounth = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    return `${day}/${mounth}`;
  }

  return (
    <Link href={`/courses/${id}/board`}>
      <Grid
        className='w-[310px] h-[280px] border-slate-300 border-[1px] rounded-t-[35px]
        rounded-b-[10px]'
      >
        <Box
          className='rounded-t-[35px] h-[25%] py-[8px] pl-[25px] border-b-slate-300
          border-b-[1px] flex flex-col justify-between'
        >
          <Typography className='truncate text-[20px] w-[75%]'>{ title }</Typography>
          <Box className='flex items-center relative w-[95%]'>
            <Typography className='truncate text-[15px] font-light w-full truncate'>
              { teacher.email }
            </Typography>
            <Box
              className='absolute bg-white rounded-[50%] right-[0px]'
            >
              <StaticIcon icon='teacherProfile' />
            </Box>
          </Box>
        </Box>
        <Box className='flex flex-col items-start overflow-y-scroll max-h-[75%]'>
          {
            course.activities.map(({ deadline, title, activities_done }) => (
              <Box
                key={`${deadline || 'none'}-${title}`}
                className='flex flex-col items-start p-[14px]'
              >
                <Box className='font-bold text-gray-600 text-[18px]'>
                  <Fragment>
                    { activities_done.length > 0
                      ? <CheckIcon className='text-green-500'/>
                      : <ClearIcon className='text-red-500'/>
                    }
                  </Fragment>
                  &nbsp;
                  Due to {formatDate(deadline)}
                </Box>
                <Typography>{ title }</Typography>
              </Box>
            ))
          }
        </Box>
      </Grid>
    </Link>
  )
}