"use client"

import { CourseTopBar } from '@/components/CourseTopBar';
import * as React from 'react';

interface CourseLayoutProps {
  children: React.ReactNode,
  params: {
    courseId: string;
  }
}

export default function CourseLayout({ children, params }: CourseLayoutProps) {
  return (
    <React.Fragment>
      <CourseTopBar courseId={ params.courseId } />
      { children }
    </React.Fragment>
  )
}