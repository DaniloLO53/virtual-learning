'use client'

import { useUserContext } from '@/contexts/userContext';
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userData } = useUserContext();

  return (
    <>
      { userData.email && children }
    </>
  )
}
