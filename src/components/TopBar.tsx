"use client"

import AppBar from '@mui/material/AppBar';
import TemporaryDrawer from './TemporaryDrawer';

export const TopBar = () => {
  return (
    <AppBar
      className='h-topBar px-[10px] border-b-[1px] border-b-slate-300 border-b-solid'
      position='fixed'
      sx={{
        boxShadow: 'none',
        backgroundColor: 'white'
      }}
    >
      <TemporaryDrawer />
    </AppBar>
  )
}