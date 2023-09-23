'use client';

import { TeacherCourse } from '@/interfaces/user/UserData';
import { Box, Grid, Typography } from '@mui/material';
import * as React from 'react';
import { CourseCard } from './CourseCard';

export interface TeacherCourseCardProps {
  course: TeacherCourse;
}

export const TeacherCourseCard = ({ course }: TeacherCourseCardProps) => {
  const { title, id, teacher, activities } = course;

  console.log('course', course);

  return (
    <CourseCard
      title={title}
      id={id}
      email={teacher.email}
      first_name={teacher.first_name}
      last_name={teacher.last_name}
    >
      {activities.map(({ _count }, index) => (
        <Box key={index} className="flex flex-col items-start p-[14px]">
          <Typography>Activities done: {_count.activities_done}</Typography>
        </Box>
      ))}
    </CourseCard>
  );
};
