'use client'

import { Suspense } from "react"
// import AuthLoading from "./loading"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className='min-w-screen min-h-screen bg-[url("/sign_wallpaper2.png")] bg-cover bg-center'
    >
      <div className='bg-gradient-to-r from-white to-transparent w-full min-h-screen flex items-center'>
        <div className='w-[50%] flex justify-center'>
          {/* <Suspense fallback={<AuthLoading />}>{children}</Suspense> */}
          { children }
        </div>
      </div>
    </div>
  )
}
