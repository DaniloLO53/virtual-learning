import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './SearchBar';
import SearchedCourses from './SearchedCourses';
import { useUserContext } from '@/contexts/userContext';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import StaticIcon, { IconNames } from './StaticIcon';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthContext } from '@/contexts/authContext';
import { useCoursesContext } from '@/contexts/coursesContext';

export default function TemporaryDrawer() {
  const { signOutHandler } = useAuthContext();
  const [state, setState] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [courses, setCourses] = React.useState([]);
  const { userData, setUserData } = useUserContext();
  const { courses: contextCourses, setCourses: contextSetCourses } = useCoursesContext();
  const role = JSON.parse((localStorage.getItem('role')) || 'null');

  const isStudent = role === 'student';

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
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
    <React.Fragment>
      <Stack direction="row">
        <IconButton aria-label="open drawer" onClick={toggleDrawer(true)}>
          <MenuIcon className="text-purple-500 text-3xl" />
        </IconButton>
        <Link href="/home">
          <StaticIcon icon={IconNames.learnusLogo} />
        </Link>
      </Stack>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        {isStudent && (
          <SearchBar
            setCourses={setCourses}
            value={value}
            setValue={setValue}
          />
        )}
        {courses.length > 0 && value.length > 0 && isStudent && (
          <SearchedCourses courses={courses} setState={setState} />
        )}
        {courses.length === 0 && value.length !== 0 && isStudent && (
          <Typography className="px-[8px]">No results</Typography>
        )}
        <List>
          <ListItem>
            <ListItemText primary={`${userData?.first_name}`} />
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => signOutHandler({setUserData, setCourses: contextSetCourses})}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <Link href="/profile">
              <ListItemButton onClick={() => setState(false)}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
