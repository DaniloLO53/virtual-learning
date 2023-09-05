import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { FileUpload } from './FileUpload';
import { useParams } from 'next/navigation';
import { fetchData } from '@/services/fetchData';
import { v4 as uuidv4 } from 'uuid';
import BasicDialog from './BasicDialog';

export interface ActivityAttachDialogProps {
  open: boolean;
  handleClose: () => any;
  activityUUID: string;
  setActivityIsDone: any;
}

export default function ActivityAttachDialog(props: ActivityAttachDialogProps) {
  const { handleClose, open, setActivityIsDone } = props;
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const params = useParams();

  async function handleSubmitAttachment(event: React.MouseEvent) {
    const { courseId, activityId } = params;
    const submissionUUID = uuidv4();
    const PATH_UPLOAD = `/files/activities/${props.activityUUID}/upload/${submissionUUID}`;
    const PATH_ACTIVITY = `/courses/${courseId}/activities/${activityId}`;
    const formData = new FormData();
    selectedFiles.forEach((file: any) => formData.append('files', file.raw));
    const payload = { uuid: submissionUUID, file: formData };

    const submission = await fetchData({ url: PATH_ACTIVITY, method: 'post', payload });
    await fetchData({ url: PATH_UPLOAD, method: 'post', payload: formData });

    setActivityIsDone(submission);
    setSelectedFiles([]);
    handleClose();
  }

  return (
      <BasicDialog open={open} onClose={handleClose}>
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
      </BasicDialog>
  );
}
