import { useUserContext } from '@/contexts/userContext';
import { TextField } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from './Button'

export const SignInForm = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { signUpHandler } = useUserContext();
  const router = useRouter();
  const formIsValid = password.length > 0 && email.length > 0

  return (
    <div
      className='bg-white opacity-80 pb-[36px] px-[24px] border-solid border-[1px] rounded-md
      border-slater-200 flex flex-col itens-center'
    >
      <Image
        src='/logo.svg'
        alt='Vercel Logo'
        className='m-[45px]'
        width={350}
        height={100}
        priority
      />
      <TextField
        className='my-[12px]'
        id='outlined-basic'
        required
        label='Email'
        variant='outlined'
        value={email}
        onChange={({ target }) => {
          setEmail(target.value);
        }}
      />
      <TextField
        className='my-[12px]'
        id='outlined-basic'
        required
        label='Password'
        variant='outlined'
        value={password}
        onChange={({ target }) => {
          setPassword(target.value)
        }}
      />
      <Button
        type='button'
        className='text-blue-500 mb-[7px] hover:font-bold'
        variant='text'
        onClick={() => router.push('/sign-up')}
      >
        Not registered yet? Sign-up here!
      </Button>
      <Button
        type='button'
        onClick={() => signUpHandler({ email, password })}
        disabled={!formIsValid}
        variant={!formIsValid ? 'transparent' : 'default'}
      >
        Sign-in
      </Button>
    </div>
  )
}