import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import StaticIcon from './StaticIcon';
import { Fragment } from 'react';
import { StudentCourse } from '@/interfaces/user/UserData';
import { CourseCard } from './CourseCard';

interface StudentCourseCardProps {
  course: StudentCourse;
}

export const StudentCourseCard = ({ course }: StudentCourseCardProps) => {
  const { title, teacher, id } = course;

  console.log('course', course)

  function formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const mounth = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    return `${day}/${mounth}`;
  }

  return (
    <CourseCard
      title={title}
      id={id}
      email={teacher.email}
      first_name={teacher.first_name}
      last_name={teacher.last_name}
      profilePictureFile={teacher.profilePictureFile}
    >
      {course.activities.map(({ deadline, title, activities_done }) => (
        <Box
          key={`${deadline || 'none'}-${title}`}
          className="flex flex-col items-start p-[14px]"
        >
          <Box className="font-bold text-gray-600 text-[18px] flex items-center">
            <Fragment>
              {activities_done.length > 0 ? (
                <CheckIcon className="text-green-500" />
              ) : (
                <ClearIcon className="text-red-500" />
              )}
            </Fragment>
            &nbsp;
            {deadline ? (
              <p>Due to {formatDate(deadline)}</p>
            ) : (
              <p>No deadline</p>
            )}
          </Box>
          <Typography>{title}</Typography>
        </Box>
      ))}
    </CourseCard>
  );
};
