import { fetchData } from '@/services/useApi';
import axios from 'axios';
import * as React from 'react';

export default function SearchBar({ setCourses, value, setValue }: any) {
  async function handleSearch({ target }: any) {
    const PATH = `/courses/query/?query=${target.value}`;
    const coursesFromApi = await fetchData(PATH, 'get');
    
    setValue(target.value);
    setCourses(coursesFromApi);
  }

  return (
    <div className='p-[10px]'>
      <input
        className='border-[1px] border-slate-500 rounded-[4px] p-[5px]'
        type='text'
        placeholder='Search courses by name or code'
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
}
