'use client'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className='min-w-screen min-h-screen bg-[url("/sign_wallpaper.jpg")] bg-cover bg-center'
    >
      <div className='bg-gradient-to-r from-white to-transparent w-full min-h-screen flex items-center'>
        <div className='w-[50%] flex justify-center'>
          { children }
        </div>
      </div>
    </div>
  )
}
