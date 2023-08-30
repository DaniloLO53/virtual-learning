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

export interface AssignGradeDialogProps {
  open: boolean;
  handleClose: () => any;
  activityUUID: string;
  grade: string;
  setGrade: any;
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

export default function AssignGradeDialog(props: AssignGradeDialogProps) {
  const { handleClose, open } = props;
  const params = useParams();

  async function handleAssignGrade(event: React.MouseEvent) {
    const { courseId, activityId, submissionId } = params;
    const { grade, description } = props;
    const PATH = `/courses/${courseId}/activities/${activityId}/submissions/${submissionId}/grade`;

    await fetchData(PATH, 'put', { grade, description });
    
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
      <DialogTitle>Set your assignment infos</DialogTitle>
      <List
        sx={{ pt: 0, paddingX: '20px' }}
        className='flex flex-col justify-center'
      >
        <ListItem disableGutters>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={props.grade}
              onChange={({ target }) => props.setGrade(target.value)}
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
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={handleAssignGrade}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Assign" />
          </ListItemButton>
        </ListItem>
      </List>
    </BootstrapDialog>
  );
}
