import AppBar from '@mui/material/AppBar';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import CourseTopBarAnchor from './CourseTopBarAnchor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BasicMenu from './BasicMenu';
import { fetchData } from '@/services/fetchData';

type CurrentTab = 'board' | 'chat' | 'activities' | 'participants' | 'groups';

export const CourseTopBar = ({ courseId }: { courseId: string }) => {
  const pathName = usePathname();
  const anchor = pathName.split('/')[pathName.split('/').length - 1];
  const [currentTab, setCurrentTab] = React.useState<CurrentTab>(anchor as CurrentTab);
  const anchors = ['board', 'activities', 'participants', 'chat', 'groups'];
  const role = JSON.parse(localStorage.getItem('role') || 'null');
  const router = useRouter();

  const removeCourse = async (id: string) => {
    const PATH = `/courses/${id}`;
    await fetchData({ url: PATH, method: 'delete' });
    router.replace('/home');
  }

  return (
    <AppBar
      className='h-[50px] mt-[50px] border-b-[1px] border-b-slate-300 px-[35px]'
      color='transparent'
      position='fixed'
      sx={{
        boxShadow: 'none',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'between',
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
      {
        role === 'teacher'
        &&
        <BasicMenu
          id={courseId}
          callBack={removeCourse}
        >
          <MoreHorizIcon sx={{ color: 'black' }} />
        </BasicMenu>
      }
    </AppBar>
  )
}