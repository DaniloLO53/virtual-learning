import AppBar from '@mui/material/AppBar';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import * as React from 'react';

type CurrentTab = 'board' | 'chat' | 'activities' | 'participants' | 'groups';

export const CourseTopBar = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const pathName = usePathname();
  const anchor = pathName.split('/')[pathName.split('/').length - 1];
  const [currentTab, setCurrentTab] = React.useState<CurrentTab>(anchor as CurrentTab);

  function handleClick(event: any) {
    const { target } = event;

    setCurrentTab(target.name);
    router.replace(`/main/courses/${courseId}/${target.name}`);
  }

  return (
    <AppBar
      className='h-[50px] flex justify-center px-[10px] mt-[50px] border-b-[1px] border-b-slate-300 px-[35px]'
      color='transparent'
      position='fixed'
      sx={{
        boxShadow: 'none',
        backgroundColor: 'white',
      }}
    >
      <ul
        className='h-full flex items-center'
      >
        <li className='h-full relative'>
          <button
            className={`${currentTab === 'board' && 'text-purple-600 bg-purple-100/60 after:content-[""] after:w-[100%] after:absolute after:bottom-[0px] after:left-[0px] after:h-[4px] after:bg-gray-400 after:rounded-t-[7px]'} h-full px-[15px]`}
            type='button'
            name='board'
            onClick={handleClick}
          >
            Board
          </button>
        </li>
        <li className='h-full relative'>
          <button
            className={`${currentTab === 'activities' && 'text-purple-600 bg-purple-100/60 after:content-[""] after:w-[100%] after:absolute after:bottom-[0px] after:left-[0px] after:h-[4px] after:bg-gray-400 after:rounded-t-[7px]'} h-full px-[15px]`}
            type='button'
            name='activities'
            onClick={handleClick}
          >
            Activities
          </button>
        </li>
        <li className='h-full relative'>
          <button
            className={`${currentTab === 'participants' && 'text-purple-600 bg-purple-100/60 after:content-[""] after:w-[100%] after:absolute after:bottom-[0px] after:left-[0px] after:h-[4px] after:bg-gray-400 after:rounded-t-[7px]'} h-full px-[15px]`}
            type='button'
            name='participants'
            onClick={handleClick}
          >
            Participants
          </button>
        </li>
        <li className='h-full relative'>
          <button
            className={`${currentTab === 'chat' && 'text-purple-600 bg-purple-100/60 after:content-[""] after:w-[100%] after:absolute after:bottom-[0px] after:left-[0px] after:h-[4px] after:bg-gray-400 after:rounded-t-[7px]'} h-full px-[15px]`}
            type='button'
            name='chat'
            onClick={handleClick}
          >
            Chat
          </button>
        </li>
        <li className='h-full relative'>
          <button
            className={`${currentTab === 'groups' && 'text-purple-600 bg-purple-100/60 after:content-[""] after:w-[100%] after:absolute after:bottom-[0px] after:left-[0px] after:h-[4px] after:bg-gray-400 after:rounded-t-[7px]'} h-full px-[15px]`}
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