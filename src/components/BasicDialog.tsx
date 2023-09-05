import * as React from 'react';
import Dialog from '@mui/material/Dialog';

export interface DialogProps {
  onClose: any;
  open: boolean;
  children: React.ReactNode;
}

export default function BasicDialog(props: DialogProps) {
  const { onClose, open, children } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth={true}
      maxWidth='md'
      sx={{
      }}
    >
      { children }
    </Dialog>
  );
}
