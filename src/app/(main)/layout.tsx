'use client'

import { Footer } from '@/components/Footer';
import { TopBar } from '@/components/TopBar'
import { usePathname } from 'next/navigation';
import React from 'react';
import MainLoading from './loading';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopBar />
      <React.Suspense fallback={<MainLoading />}>{children}</React.Suspense>
      {/* { children } */}
    </>
  )
}
