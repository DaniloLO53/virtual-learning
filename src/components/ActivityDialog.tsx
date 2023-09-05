import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { TextField, TextareaAutosize, Checkbox } from '@mui/material';
import { FileUpload } from './FileUpload';
import { useParams } from 'next/navigation';
import { fetchData } from '@/services/fetchData';
import Calendar from './Calendar';
import { v4 as uuidv4 } from 'uuid';
import BasicDialog from './BasicDialog';

export interface ActivityDialogProps {
  open: boolean;
  handleClose: () => any;
  title: string;
  setTitle: any;
  description: string;
  setDescription: any;
}

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
    const payload = {
      title,
      description,
      deadline: formatDate(deadline),
      uuid: activityUUID,
      file: formData,
    }

    await fetchData({ url: PATH_ACTIVITY, method: 'post', payload });
    await fetchData({ url: PATH_UPLOAD, method: 'post', payload: formData });

    setSelectedFiles([]);
    handleClose();
  }
  

  return (
    <BasicDialog onClose={handleClose} open={open}>
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
        <FileUpload selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
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
    </BasicDialog>
  );
}
