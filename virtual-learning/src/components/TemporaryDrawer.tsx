import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './SearchBar';
import SearchedCourses from './SearchedCourses';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/userContext';
import LogoutIcon from '@mui/icons-material/Logout';

export default function TemporaryDrawer() {
  const { signOutHandler } = useUserContext();
  const router = useRouter();
  const [state, setState] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [courses, setCourses] = React.useState([]);

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setCourses([]);
      setState(open);
      setValue('');
    };

  function backToHome() {
    const role = JSON.parse(localStorage.getItem('role') || '');
    router.replace(`/main/home/${role}`);
  }

  return (
    <div>
      <div className='flex items-center gap-x-[15px]'>
        <button
          onClick={toggleDrawer(true)}
          className='bg-transparent border-none'
        >
          <MenuIcon
            className='text-purple-500 text-3xl'
          />
        </button>
        <button
          type='button'
          onClick={backToHome}
        >
          <Image
            src='/learnus.svg'
            alt='Default profile logo'
            width={140}
            height={70}
            priority
          />
        </button>
      </div>
      <Drawer
        anchor='left'
        open={state}
        onClose={toggleDrawer(false)}
      >
        <SearchBar setCourses={setCourses} value={value} setValue={setValue} />
          {
            courses.length > 0
            && value.length > 0
            && <SearchedCourses courses={courses} setState={setState} />
          }
          {
            courses.length === 0
            && value.length !== 0
            && <p className='px-[8px]'>No results</p>
          }
          <ul
            role='list'
            className='divide-y divide-slate-400 flex flex-col p-[20px]'
          >
            <li className=''>
              <button
                className='flex flex-row items-center gap-x-[10px]'
                type='button'
                onClick={signOutHandler}
              >
                <span>
                  <LogoutIcon />
                </span>
                Sign out
              </button>
            </li>
          </ul>
      </Drawer>
    </div>
  );
}
