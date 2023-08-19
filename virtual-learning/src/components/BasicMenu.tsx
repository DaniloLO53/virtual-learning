import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

export default function BasicMenu({ children, registrationId, participants, setParticipants }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  console.log('registrationId', registrationId)
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = ({ target }: any) => {
    setAnchorEl(null);
  };

  const removeStudent = async () => {
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + `/registrations/${registrationId}`;
    const config = {
      headers: {
        role: 'teacher',
        authorization: 'Bearer ' + TOKEN
      },
    }
    try {
      const { data } = await axios.delete(URL, { ...config });
      setParticipants(data);
      console.log('Data:', data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        { children }
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem id='remove' onClick={removeStudent}>Remove</MenuItem>
      </Menu>
    </div>
  );
}