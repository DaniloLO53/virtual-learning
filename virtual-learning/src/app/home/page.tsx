'use client'

import Button from '@/components/Button';
import { useUserContext } from '@/contexts/userContext';
import axios from 'axios';
import React from 'react';

export default function Home() {
  const { userData } = useUserContext();

  async function loadHome() {
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + '/courses';
    const config = {
      headers: {
        role: 'student',
        authorization: 'Bearer ' + userData.access_token
      }
    }
    const response = await axios.get(URL, { ...config });
  }
  
  return (
    <div className=''>
      <Button
        onClick={loadHome}
      >
        Load
      </Button>
    </div>
  )
}