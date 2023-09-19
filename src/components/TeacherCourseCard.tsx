'use client'

import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Course } from './StudentCourseCard';

export interface TeacherCourseCardProps {
  course: Course
}

export const TeacherCourseCard = ({ course }: TeacherCourseCardProps) => {
  const { title, code, id } = course;

  return (
    <Link
      className='p-[15px]'
      href={`/courses/${id}/board`}
    >
      <Grid
        className='w-[310px] h-[280px] border-slate-300 border-[1px] rounded-t-[35px] rounded-b-[10px]'
      >
        <Box
          className='rounded-t-[35px] h-[25%] py-[8px] pl-[25px] border-b-slate-300
          border-b-[1px] flex flex-col justify-between'
        >
          <Typography className='w-full text-[20px] truncate text-left'>
            { title }
          </Typography>
          <Typography className='text-[12px]'>
            { code }
          </Typography>
        </Box>
      </Grid>
    </Link>
  )
}