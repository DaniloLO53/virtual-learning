import AppBar from '@mui/material/AppBar';
import { useState } from 'react';

type CurrentPage = 'board' | 'chat' | 'activities' | 'participants' | 'groups';

export const CourseTopBar = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('board');

  function handleClick(event: any) {
    const { target } = event;

    setCurrentPage(target.name);
  }

  return (
    <AppBar
      className='h-[50px] flex justify-center px-[10px] top-[50px] border-b-[1px] border-b-slate-300 px-[35px]'
      color='transparent'
      position='fixed'
      sx={{
        boxShadow: 'none'
      }}
    >
      <ul
        className='h-full flex items-center'
      >
        <li className='h-full relative'>
          <button
            className={`${currentPage === 'board' && 'bg-purple-100/60 after:content-[""] after:w-[100%] after:absolute after:bottom-[0px] after:left-[0px] after:h-[4px] after:bg-gray-400 after:rounded-t-[7px]'} h-full px-[15px]`}
            type='button'
            name='board'
            onClick={handleClick}
          >
            Board
          </button>
        </li>
        <li className='h-full relative'>
          <button
            className={`${currentPage === 'activities' && 'bg-purple-100/60 after:content-[""] after:w-[100%] after:absolute after:bottom-[0px] after:left-[0px] after:h-[4px] after:bg-gray-400 after:rounded-t-[7px]'} h-full px-[15px]`}
            type='button'
            name='activities'
            onClick={handleClick}
          >
            Activities
          </button>
        </li>
        <li className='h-full relative'>
          <button
            className={`${currentPage === 'participants' && 'bg-purple-100/60 after:content-[""] after:w-[100%] after:absolute after:bottom-[0px] after:left-[0px] after:h-[4px] after:bg-gray-400 after:rounded-t-[7px]'} h-full px-[15px]`}
            type='button'
            name='participants'
            onClick={handleClick}
          >
            Participants
          </button>
        </li>
        <li className='h-full relative'>
          <button
            className={`${currentPage === 'chat' && 'bg-purple-100/60 after:content-[""] after:w-[100%] after:absolute after:bottom-[0px] after:left-[0px] after:h-[4px] after:bg-gray-400 after:rounded-t-[7px]'} h-full px-[15px]`}
            type='button'
            name='chat'
            onClick={handleClick}
          >
            Chat
          </button>
        </li>
        <li className='h-full relative'>
          <button
            className={`${currentPage === 'groups' && 'bg-purple-100/60 after:content-[""] after:w-[100%] after:absolute after:bottom-[0px] after:left-[0px] after:h-[4px] after:bg-gray-400 after:rounded-t-[7px]'} h-full px-[15px]`}
            type='button'
            name='groups'
            onClick={handleClick}
          >
            Groups
          </button>
        </li>
      </ul>
    </AppBar>
  )
}