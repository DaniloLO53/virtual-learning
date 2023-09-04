import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './SearchBar';
import SearchedCourses from './SearchedCourses';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/userContext';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { Box, Container, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import StaticIcon, { IconNames, Icons } from './StaticIcon';

export default function TemporaryDrawer() {
  const { signOutHandler } = useUserContext();
  const [state, setState] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [courses, setCourses] = React.useState([]);
  const isStudent = JSON.parse(localStorage.getItem('role') || 'null') === 'student';

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

  return (
    <>
      <Stack direction='row'>
        <IconButton
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon className='text-purple-500 text-3xl' />
        </IconButton>
        <Link href='/home'>
          <StaticIcon icon={IconNames.learnusLogo} />
        </Link>
      </Stack>
      <Drawer
        anchor='left'
        open={state}
        onClose={toggleDrawer(false)}
      >
        {
          isStudent &&
          <SearchBar
            setCourses={setCourses}
            value={value}
            setValue={setValue} 
          />
        }
          {
            courses.length > 0
            && value.length > 0
            && isStudent
            && <SearchedCourses courses={courses} setState={setState} />
          }
          {
            courses.length === 0
            && value.length !== 0
            && isStudent
            && <p className='px-[8px]'>No results</p>
          }
          <List>
            <ListItem>
              <ListItemButton onClick={signOutHandler}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Sign out' />
              </ListItemButton>
            </ListItem>
          </List>
      </Drawer>
    </>
  );
}
