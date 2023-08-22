import { List } from '@mui/material';
import * as React from 'react';
import SearchedCourse from './SearchedCourse';

export default function SearchedCourses({ courses, setState }: any) {

  return (
    <List
      // className='flex flex-col max-h-[50%] overflow-y-scroll border-b-slate-300 border-b-[1px]'
    >
      {
        courses.length > 0 ? courses.map((course: any, index: number) => (
          <SearchedCourse
            key={course.code + index}
            course={course}
            setState={setState}
          />
        ))
       : <li>No results</li>}
    </List>
  );
}
