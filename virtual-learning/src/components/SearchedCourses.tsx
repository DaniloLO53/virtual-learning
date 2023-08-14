import * as React from 'react';
import SearchedCourse from './SearchedCourse';

export default function SearchedCourses({ courses }: any) {

  return (
    <ul
      className='flex flex-col max-h-[50%] overflow-y-scroll border-b-slate-300 border-b-[1px]'
    >
      {
        courses.length > 0 ? courses.map((course: any, index: number) => (
          <SearchedCourse
            key={course.code + index}
            course={course}
          />
        ))
       : <li>No results</li>}
    </ul>
  );
}
