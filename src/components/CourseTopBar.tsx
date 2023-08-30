import AppBar from '@mui/material/AppBar';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import CourseTopBarAnchor from './CourseTopBarAnchor';

type CurrentTab = 'board' | 'chat' | 'activities' | 'participants' | 'groups';

export const CourseTopBar = ({ courseId }: { courseId: string }) => {
  const pathName = usePathname();
  const anchor = pathName.split('/')[pathName.split('/').length - 1];
  const [currentTab, setCurrentTab] = React.useState<CurrentTab>(anchor as CurrentTab);
  const anchors = ['board', 'activities', 'participants', 'chat', 'groups'];

  return (
    <AppBar
      className='h-[50px] flex justify-center mt-[50px] border-b-[1px] border-b-slate-300 px-[35px]'
      color='transparent'
      position='fixed'
      sx={{
        boxShadow: 'none',
        backgroundColor: 'white',
      }}
    >
      <ul className='min-h-full flex items-center'>
        {
          anchors.map((anchorName) => (
            <CourseTopBarAnchor
              anchorName={anchorName}
              key={anchorName}
              courseId={courseId}
              setCurrentTab={setCurrentTab}
              currentTab={currentTab}
            />
          ))
        }
      </ul>
    </AppBar>
  )
}