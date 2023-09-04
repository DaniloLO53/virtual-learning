import { fetchData } from '@/services/fetchData';
import axios from 'axios';
import * as React from 'react';

export default function SearchBar({ setCourses, value, setValue }: any) {
  async function handleSearch({ target }: any) {
    setValue(target.value);
  }

  React.useEffect(() => {
    async function fetchDataAsync() {
      const PATH = `/courses/query/?query=${value}`;
      const coursesFromApi = await fetchData({ url: PATH });
      setCourses(coursesFromApi);
    }

    fetchDataAsync();
  }, [value]);

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
