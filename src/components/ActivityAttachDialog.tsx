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
import { styled, TextField, TextareaAutosize, Box, Checkbox } from '@mui/material';
import { FileUpload, FileUploadProps } from './FileUpload';
import { useParams } from 'next/navigation';
import { fetchData } from '@/services/fetchData';
import axios from 'axios';
import Calendar from './Calendar';
import { v4 as uuidv4 } from 'uuid';

export interface ActivityAttachDialogProps {
  open: boolean;
  handleClose: () => any;
  activityUUID: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    // padding: theme.spacing(20),
  },
  '& .MuiDialogActions-root': {
    // padding: theme.spacing(20),
  },
}));

export default function ActivityAttachDialog(props: ActivityAttachDialogProps) {
  const { handleClose, open } = props;
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const params = useParams();

  async function handleSubmitAttachment(event: React.MouseEvent) {
    const { courseId, activityId } = params;
    const submissionUUID = uuidv4();
    const PATH_UPLOAD = `/files/activities/${props.activityUUID}/upload/${submissionUUID}`;
    const PATH_ACTIVITY = `/courses/${courseId}/activities/${activityId}`;
    const formData = new FormData();
    selectedFiles.forEach((file: any) => formData.append('files', file.raw));

    await fetchData(
      PATH_ACTIVITY,
      'post',
      { uuid: submissionUUID, file: formData }
    );
    await fetchData(PATH_UPLOAD, 'post', formData);
    
    setSelectedFiles([]);
    handleClose();
  }
  

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      fullWidth={true}
      maxWidth='md'
      sx={{
      }}
    >
      <DialogTitle>Set your attachment infos</DialogTitle>
      <List
        sx={{ pt: 0, paddingX: '20px' }}
        className='flex flex-col justify-center'
      >
          <div className=''>
            <FileUpload selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
          </div>          
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={handleSubmitAttachment}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Submit" />
          </ListItemButton>
        </ListItem>
      </List>
    </BootstrapDialog>
  );
}
