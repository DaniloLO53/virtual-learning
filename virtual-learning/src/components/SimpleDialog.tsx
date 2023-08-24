import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import { styled, TextField, TextareaAutosize, Box } from '@mui/material';
import { FileUpload, FileUploadProps } from './FileUpload';

const fileUploadProp: FileUploadProps = {
  accept: '.pdf,.jpg,.png,.jpeg',
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('EVENT', event)
    if (event.target.files !== null && event.target?.files?.length > 0) {
        console.log(`Saving ${event.target.value}`)
      }
    },
  onDrop: (event: React.DragEvent<HTMLElement>) => {
    console.log(`Drop ${event.dataTransfer.files[0].name}`)
  },
}

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => any;
  title: string;
  setTitle: any;
  description: string;
  setDescription: any;
  customProps?: any;
  upload?: boolean;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    // padding: theme.spacing(20),
  },
  '& .MuiDialogActions-root': {
    // padding: theme.spacing(20),
  },
}));

export default function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, customProps } = props;

  return (
    <BootstrapDialog
      onClose={onClose}
      open={open}
      fullWidth={true}
      maxWidth='md'
      sx={{
      }}
    >
      <DialogTitle>Set your content infos</DialogTitle>
      <List
        sx={{ pt: 0, paddingX: '20px' }}
        className='flex flex-col justify-center'
      >
          <ListItem disableGutters>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={props.title}
              onChange={({ target }) => props.setTitle(target.value)}
              className='w-full'
            />
          </ListItem>
          <ListItem disableGutters>
            <TextareaAutosize
              className='p-[10px] rounded-[4px] border-slate-300 border-[1px] w-full'
              id="outlined-basic"
              placeholder='Description'
              minRows={5}
              maxRows={10}
              value={props.description}
              onChange={({ target }) => props.setDescription(target.value)}
            />
          </ListItem>
          <div className=''>
            <FileUpload {...fileUploadProp} />
          </div>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={customProps.submit}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Create" />
          </ListItemButton>
        </ListItem>
      </List>
    </BootstrapDialog>
  );
}
