import { useUserContext } from '@/contexts/userContext';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from './Button'

export const SignInForm = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const { signInHandler } = useUserContext();
  const router = useRouter();
  const formIsValid = password.length > 0 && email.length > 0;

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
        onChange={({ target }) => setEmail(target.value)}
      />
      <TextField
        className='my-[12px]'
        id='outlined-basic'
        required
        label='Password'
        variant='outlined'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button
        type='button'
        className='text-blue-500 mb-[7px] hover:font-bold'
        variant='text'
        onClick={() => router.push('/auth/sign-up')}
      >
        Not registered yet? Sign-up here!
      </Button>
      <div>
        <FormControl fullWidth className='mb-[20px]'>
          <InputLabel id='role-label'>Sign in as</InputLabel>
          <Select
            labelId='role-label'
            id='role'
            value={role}
            label='Sign up as'
            onChange={({ target }) => setRole(target.value)}
          >
            <MenuItem value={'student'}>Student</MenuItem>
            <MenuItem value={'teacher'}>Teacher</MenuItem>
          </Select>
        </FormControl>
        <Button
        type='button'
        onClick={() => signInHandler({ email, password }, role)}
        disabled={!formIsValid}
        variant={!formIsValid ? 'transparent' : 'default'}
      >
        Sign-in
      </Button>
      </div>
    </div>
  )
}