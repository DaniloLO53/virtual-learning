import AppBar from '@mui/material/AppBar';
import TemporaryDrawer from './TemporaryDrawer';

export const TopBar = () => {
  return (
    <AppBar
      className='h-[50px] flex justify-center px-[10px] border-b-[1px] border-b-slate-300 border-b-solid'
      color='transparent'
      position='fixed'
      sx={{
        boxShadow: 'none'
      }}
    >
      <TemporaryDrawer />
    </AppBar>
  )
}