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
import BasicDialog from './BasicDialog';
import { NewCourseInfos } from '@/app/(main)/home/page';

export interface NewCourseDialogProps {
  open: boolean;
  onClose: () => any;
  newCourseInfos: NewCourseInfos | null;
  setNewCourseInfos: any;
  handlePublishCourse: any;
}

export default function NewCourseDialog(props: NewCourseDialogProps) {
  const {
    onClose,
    open,
    handlePublishCourse,
    newCourseInfos,
    setNewCourseInfos,
  } = props;

  return (
    <BasicDialog onClose={onClose} open={open}>
      <DialogTitle>Set your content infos</DialogTitle>
      <List
        sx={{ pt: 0, paddingX: '20px' }}
        className="flex flex-col justify-center"
      >
        <ListItem disableGutters>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={newCourseInfos?.title || ''}
            onChange={({ target }) =>
              setNewCourseInfos((prevState: NewCourseInfos) => ({
                ...prevState,
                title: target.value,
              }))
            }
            className="w-full"
          />
        </ListItem>
        <ListItem disableGutters>
          <TextareaAutosize
            className="p-[10px] rounded-[4px] border-slate-300 border-[1px] w-full"
            id="outlined-basic"
            placeholder="Description"
            minRows={5}
            maxRows={10}
            value={newCourseInfos?.description || ''}
            onChange={({ target }) =>
              setNewCourseInfos((prevState: NewCourseInfos) => ({
                ...prevState,
                description: target.value,
              }))
            }
          />
        </ListItem>
        <ListItem disableGutters>
          <TextField
            id="outlined-basic"
            label="Code"
            variant="outlined"
            value={newCourseInfos?.code || ''}
            onChange={({ target }) =>
              setNewCourseInfos((prevState: NewCourseInfos) => ({
                ...prevState,
                code: target.value,
              }))
            }
            className="w-full"
          />
        </ListItem>

        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={handlePublishCourse}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Create" />
          </ListItemButton>
        </ListItem>
      </List>
    </BasicDialog>
  );
}
