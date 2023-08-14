import axios from 'axios';
import * as React from 'react';

export default function SearchBar({ setCourses, value, setValue }: any) {
  async function handleSearch(event: any) {
    const { target } = event;
    setValue(target.value);
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) +
      `/courses/query/?query=${target.value}`;
    const config = {
      headers: {
        role: 'student',
        authorization: 'Bearer ' + TOKEN
      },
    }
    const { data } = await axios.get(URL, { ...config });

    setCourses(data);
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
