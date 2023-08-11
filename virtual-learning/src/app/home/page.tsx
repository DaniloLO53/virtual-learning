'use client'

import Button from '@/components/Button';
import axios from 'axios';
import React from 'react';

export default function Home() {
  async function loadHome() {
    console.log('oi')
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + '/courses';
    const config = {
      headers: {
        role: 'student'
      }
    }
    const response = await axios.get(URL, { ...config });
    console.log('Response', response)
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