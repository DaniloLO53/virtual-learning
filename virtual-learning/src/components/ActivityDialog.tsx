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

export interface ActivityDialogProps {
  open: boolean;
  handleClose: () => any;
  title: string;
  setTitle: any;
  description: string;
  setDescription: any;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    // padding: theme.spacing(20),
  },
  '& .MuiDialogActions-root': {
    // padding: theme.spacing(20),
  },
}));

export default function ActivityDialog(props: ActivityDialogProps) {
  const { handleClose, open, title, description } = props;
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [deadline, setDeadline] = React.useState<Date | null>(null);
  const [noDeadline, setNoDeadline] = React.useState<boolean>(false);
  const params = useParams();

  function formatDate(inputDate: Date | null) {
    if (!inputDate) return null;
  
    const day = String(inputDate.getDate()).padStart(2, '0');
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const year = String(inputDate.getFullYear());
  
    return `${day}-${month}-${year}`;
  }

  async function handlePublishActivity(event: React.MouseEvent) {
    const { courseId } = params;
    const activityUUID = uuidv4();
    const PATH_UPLOAD = `/files/activities/${activityUUID}/upload/teacher`;
    const PATH_ACTIVITY = `/courses/${courseId}/activities`;
    const formData = new FormData();
    selectedFiles.forEach((file: any) => formData.append('files', file.raw));

    await fetchData(PATH_ACTIVITY, 'post', { title, description, deadline: formatDate(deadline), uuid: activityUUID });
    await fetchData(PATH_UPLOAD, 'post', formData);
    // const result = await axios({
    //   method: 'post',
    //   url: 'http://localhost:5000' + PATH,
    //   headers: {
    //     authorization: 'Bearer ' + JSON.parse(localStorage.getItem('access_token')!),
    //     "Content-Type": 'multipart/form-data',
    //   },
    //   data: formData,

    // })

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
            <FileUpload selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
          </div>
          <div>
            No deadline
            <Checkbox checked={noDeadline} onChange={() => setNoDeadline(!noDeadline)} />
          </div>
          
          <ListItem>
            { !noDeadline && <Calendar day={deadline} handleDay={setDeadline} />}
          </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={handlePublishActivity}
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
