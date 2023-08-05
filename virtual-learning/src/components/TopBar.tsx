import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';

export const TopBar = () => {
  return (
    <AppBar
      className='shadow-none bg-white border-rounded border-slater-200 border-b-[1px]
      h-[50px] flex-row items-center px-[10px] py-[6px]'
    >
      <MenuIcon className='text-purple-500 text-3xl' />
    </AppBar>
  )
}