"use client"

import { CourseTopBar } from '@/components/CourseTopBar';
import * as React from 'react';

interface CourseLayoutProps {
  children: React.ReactNode,
  params: {
    courseId: string;
  }
}

export default function CourseLayout(
{ children, params }: CourseLayoutProps) {
  console.log(params)
  return (
    <div>
      <CourseTopBar courseId={ params.courseId } />
      { children }
    </div>
  )
}