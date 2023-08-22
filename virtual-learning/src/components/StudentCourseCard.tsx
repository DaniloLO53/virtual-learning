import Image from 'next/image';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';
import { Box, Grid } from '@mui/material';
import StaticIcon from './StaticIcon';

export const StudentCourseCard = ({ course }: any) => {
  const { title, teacher, id } = course;

  console.log('course', course)

  function formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const mounth = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    return `${day}/${mounth}`;
  }

  return (
    <Link
      href={`/courses/${id}/board`}
    >
      <Grid
        className='w-[310px] h-[280px] border-slate-300 border-[1px] rounded-t-[35px] rounded-b-[10px]'
      >
        <Box
          className='rounded-t-[35px] h-[25%] py-[8px] pl-[25px] border-b-slate-300
          border-b-[1px] flex flex-col justify-between'
        >
          <span className='truncate text-[20px] w-[75%]'>{ title }</span>
          <div className='flex items-center relative w-[95%]'>
            <span className='truncate text-[15px] font-light w-full truncate'>{ teacher.email }</span>
            <div
              className='absolute bg-white rounded-[50%] right-[0px]'
            >
              <StaticIcon icon='teacherProfile' />
            </div>
          </div>
        </Box>
        <Box
          className='flex flex-col items-start overflow-y-scroll max-h-[75%]'
        >
          {
            course.activities.map(({ deadline, title, activities_done }: any) => (
              <div
                key={`${deadline || 'none'}-${title}`}
                className='flex flex-col items-start p-[14px]'
              >
                <h3
                  className='font-bold text-gray-600 text-[18px]'
                >
                  <span>
                    { activities_done.length > 0
                      ? <CheckIcon className='text-green-500'/>
                      : <ClearIcon className='text-red-500'/>
                    }
                  </span>
                  &nbsp;
                  Due to {formatDate(deadline)}
                </h3>
                <p>{ title }</p>
              </div>
            ))
          }
        </Box>
      </Grid>
    </Link>
  )
}