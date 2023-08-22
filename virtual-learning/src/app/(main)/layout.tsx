'use client'

import { Footer } from '@/components/Footer';
import { TopBar } from '@/components/TopBar'
import { usePathname } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopBar />
      { children }
      <Footer />
    </>
  )
}
