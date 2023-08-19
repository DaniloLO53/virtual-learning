import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';

function ArticleSummaryLink({ id, title, updated_at, courseId }: any) {
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

  return (
    <Link
      className='w-full p-[20px] flex items-center justify-between hover:bg-purple-200/40'
      key={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={`/courses/${courseId}/board/articles/${id}`}
    >
      <span className=''>
        { title }
      </span>
        <span className='text-slate-500 text-[12px] flex items-center gap-[10px]'>
          <span className=''>
            <span>Last update:</span>
            &nbsp;
            <span>{ updated_at }</span>
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

export default ArticleSummaryLink;