'use client'

import Button from '@/components/Button';
import { TopBar } from '@/components/TopBar';
import { useUserContext } from '@/contexts/userContext';
import axios from 'axios';
import React from 'react';

export default function Home() {
  const { userData } = useUserContext();

  console.log('userData:', userData)

  
  return (
    <div className=''>
      <TopBar
      />
      {/* <Button
        onClick={loadHome}
      >
        Load
      </Button> */}
    </div>
  )
}