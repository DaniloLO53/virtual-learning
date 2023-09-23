'use client'

import { useUserContext } from '@/contexts/userContext';
import React from 'react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userData } = useUserContext();

  return (
    <>
      { userData && children }
    </>
  )
}
