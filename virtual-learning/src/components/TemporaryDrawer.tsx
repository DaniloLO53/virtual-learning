import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './SearchBar';
import SearchedCourses from './SearchedCourses';

export default function TemporaryDrawer() {
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

  return (
    <div>
      <button
        onClick={toggleDrawer(true)}
        className='bg-transparent border-none'
      >
        <MenuIcon
          className='text-purple-500 text-3xl'
        />
      </button>
      <Drawer
        anchor='left'
        open={state}
        onClose={toggleDrawer(false)}
      >
        <SearchBar setCourses={setCourses} value={value} setValue={setValue} />
        {
          courses.length > 0 && value.length > 0 && <SearchedCourses courses={courses} />
        }
        {
          courses.length === 0
          && value.length !== 0
          && <p className='px-[8px]'>No results</p>
        }
      </Drawer>
    </div>
  );
}
