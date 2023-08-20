"use client"

import { CourseTopBar } from '@/components/CourseTopBar';
import { usePathname } from 'next/navigation';
import * as React from 'react';

interface CourseLayoutProps {
  children: React.ReactNode,
  params: {
    courseId: string;
  }
}

export default function CourseLayout(
{ children, params }: CourseLayoutProps) {

  return (
    <div>
      <CourseTopBar courseId={ params.courseId } />
      { children }
    </div>
  )
}