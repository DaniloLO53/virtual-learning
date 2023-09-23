'use client';

import { UserCourses } from '@/components/UserCourses';
import { Courses, useCoursesContext } from '@/contexts/coursesContext';
import { fetchData } from '@/services/fetchData';
import { Container } from '@mui/material';
import React, { useState } from 'react';

export interface NewCourseInfos {
  title: string;
  description: string;
  code: string;
}

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [newCourseInfos, setNewCourseInfos] = useState<NewCourseInfos | null>(
    null
  );
  const { setCourses } = useCoursesContext();

  const handlePublishCourse = async () => {
    setOpen(false);

    if (newCourseInfos) {
      const { title, description, code } = newCourseInfos;

      const PATH = '/courses';

      const publishedCourse = await fetchData({
        url: PATH,
        method: 'post',
        payload: {
          title,
          description,
          code,
        },
      });

      setCourses((prevState: Courses) => ([ ...prevState, publishedCourse ]));
    }
  };

  return (
    <Container className="pt-topBar">
      <UserCourses
        handlePublishCourse={handlePublishCourse}
        newCourseInfos={newCourseInfos}
        setNewCourseInfos={setNewCourseInfos}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  );
}
