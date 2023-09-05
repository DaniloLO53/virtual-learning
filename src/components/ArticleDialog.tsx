import * as React from 'react';
import Button from '@mui/material/Button';
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

export interface ArticleDialogProps {
  open: boolean;
  onClose: () => any;
  title: string;
  setTitle: any;
  description: string;
  setDescription: any;
  handlePublishArticle: any;
}

export default function ArticleDialog(props: ArticleDialogProps) {
  const { onClose, open, handlePublishArticle } = props;

  return (
    <BasicDialog onClose={onClose} open={open}>
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
  
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={handlePublishArticle}
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
