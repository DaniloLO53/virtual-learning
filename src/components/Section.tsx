import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';

function Section({ article_id, section_id, title, updated_at, course_id }: any) {
  const [showDots, setShowDots] = React.useState(false);
  const role = JSON.parse(localStorage.getItem('role') || '');
  function handleMouseEnter(event: React.MouseEvent) {
    event.stopPropagation();
    setShowDots(true);
    console.log('event', event)
  }

  function handleMouseLeave(event: React.MouseEvent) {
    event.stopPropagation();
    setShowDots(false);
    console.log('event', event)
  }

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
  }

  function handleDotsVisibility() {
    if (role === 'student') return false;
    return showDots;
  }

  function formatUpdatedAt(updatedAt: string): string {
    const date = new Date(updatedAt);
    
    const year = date.getUTCFullYear().toString();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
    return `${year}-${month}-${day} • ${hours}:${minutes}`;
  }

  return (
    <Link
      className='w-full p-[15px] flex items-center justify-between hover:bg-purple-200/40'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={`/courses/${course_id}/articles/${article_id}/sections/${section_id}`}
    >
      <span className=''>
        { title }
      </span>
        <span className='text-slate-500 text-[12px] flex items-center gap-[10px]'>
          <span className=''>
            <span>Last update:</span>
            &nbsp;
            <span>{ formatUpdatedAt(updated_at) }</span>
          </span>
          {role === 'teacher' &&
          <button
            type='button'
            className={`${!handleDotsVisibility() && 'invisible'} hover:bg-gray-300 rounded-[50%] p-[5px]`}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </button>}
        </span>
      </Link>
  )
}

export default Section;