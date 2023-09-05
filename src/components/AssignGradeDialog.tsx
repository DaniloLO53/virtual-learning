import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { TextField, TextareaAutosize } from '@mui/material';
import { useParams } from 'next/navigation';
import { fetchData } from '@/services/fetchData';
import BasicDialog from './BasicDialog';

export interface AssignGradeDialogProps {
  open: boolean;
  handleClose: () => any;
  activityUUID: string;
  grade: string;
  setGrade: any;
  description: string;
  setDescription: any;
  setSubmission: any;
}

export default function AssignGradeDialog(props: AssignGradeDialogProps) {
  const { handleClose, open, setSubmission } = props;
  const params = useParams();

  async function handleAssignGrade(event: React.MouseEvent) {
    const { courseId, activityId, submissionId } = params;
    const { grade, description } = props;
    const PATH = `/courses/${courseId}/activities/${activityId}/submissions/${submissionId}/grade`;
    const payload = { grade, description };

    const gradeAssignment = await fetchData({ url: PATH, method: 'put', payload });
    console.log('gradeAssignment', gradeAssignment)
    setSubmission();
    handleClose();
  }

  return (
    <BasicDialog onClose={handleClose} open={open} >
      <DialogTitle>Set your assignment infos</DialogTitle>
      <List
        sx={{ pt: 0, paddingX: '20px' }}
        className='flex flex-col justify-center'
      >
        <ListItem disableGutters>
            <TextField
              id="outlined-basic"
              label="Grade"
              type='number'
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
    </BasicDialog>
  );
}
