import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function SearchedCourse({ course, setState }: any) {
  const { title, code, teacher, id } = course;
  const router = useRouter();

  function handleClick() {
    setState(false);
    router.replace(`/main/registrations/${id}`);
  }

  return (
    <li
      className='w-[90%] rounded-r-[12px] p-[10px] pl-[18px] my-[5px] flex justify-start hover:bg-purple-100/60'
    >
      <button
        type='button'
        onClick={handleClick}
      >
        <p className='flex text-[18px]'>{ title }</p>
        <p className='text-[14px]'>
          <span>{ code }</span>
          &nbsp; &#8226; &nbsp;
          <span>{ teacher.email }</span>
        </p>
      </button>
    </li>
  );
}
