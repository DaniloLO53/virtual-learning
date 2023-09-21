"use client"

import { CourseTopBar } from '@/components/CourseTopBar';
import * as React from 'react';
import AnchorLoading from './loading';

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
      <React.Suspense fallback={<AnchorLoading />}>{children}</React.Suspense>
      {/* { children } */}
    </React.Fragment>
  )
}