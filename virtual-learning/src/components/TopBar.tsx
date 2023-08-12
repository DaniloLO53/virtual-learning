import AppBar from '@mui/material/AppBar';
import TemporaryDrawer from './TemporaryDrawer';

export const TopBar = () => {
  return (
    <AppBar
      className='h-[50px] flex justify-center px-[10px]'
      color='transparent'
      position='fixed'
    >
      <TemporaryDrawer />
    </AppBar>
  )
}