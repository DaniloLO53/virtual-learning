'use client'

import { useUserContext } from '@/contexts/userContext';
import React from 'react';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userData } = useUserContext();

  return (
    <>
      { children }
    </>
  )
}
