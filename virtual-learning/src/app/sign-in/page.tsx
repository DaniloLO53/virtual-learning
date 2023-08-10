'use client'

import { SignInForm } from '@/components/SignInForm';
import React from 'react';

export default function SignUp() {
  
  return (
    <div className='w-full h-screen bg-[url("/sign_wallpaper.jpg")]'>
      <div className='bg-gradient-to-r from-white to-transparent w-full h-full flex items-center'>
        <div className='w-[50%] flex justify-center'>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}