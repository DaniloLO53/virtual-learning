"use client"

import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { fetchData } from '@/services/fetchData';
import {socketService} from '../../../../../../services/socketService'
import { useWebSocketContext } from '@/contexts/webSocketContext';
import { List, ListItem, ListItemText } from '@mui/material';

interface ChatParams {
  params: {
    courseId: string;
  }
}

interface MessageProps {
  content: string;
}

export default function Chat({ params }: ChatParams) {
  const [message, setMessage] = React.useState<MessageProps | null>(null);
  const [messages, setMessages] = React.useState<MessageProps[]>([]);
  const { socket } = useWebSocketContext();

  async function subscribeMessages() {
    const { courseId } = params;
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + `/courses/${courseId}/registration`;
    
    socket.on('connected', () => console.log('Connected'));
    socket.on('onMessage', (data) => {
      console.log('Data from onMessage', data);
      setMessages((prevState) => [ ...prevState, data ]);
    })
    
    return () => {
      socket.off('connected');
      socket.off('onMessage');
      console.log('Unregistered events');
    }
  }
  
  async function handleSendMessage(event: any) {
    message?.content && socket.emit('message', message?.content);
    setMessage(null);
  }

  async function handleWriteMessage(event: any) {
    const { value } = event.target;
    setMessage((prevState) => ({ ...prevState, content: value}));
  }

  React.useEffect(() => {
    subscribeMessages();
  }, [])
  return (
    <div
      className='pt-[120px] flex justify-center'
    >
      <div
        className='w-[60%] flex flex-col relative items-center bg-red-100 min-h-[calc(100vh-200px)]'
      >
        <List>
          {
            messages.map(({ content}, index) => (
              <ListItem
                key={index}
                className=''
              >
                <ListItemText>
                  { content }
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
        <aside
          className='fixed bottom-[0px] w-[60%] h-[70px] flex items-center border-[1px] border-slate-300 rounded-[8px] mb-[10px]'
        >
          <input
            placeholder='Write your message'
            className='w-[90%] min-h-full rounded-[8px] px-[12px] bg-transparent'
            value={message?.content || ''}
            onChange={handleWriteMessage}
          />
          <button
            type='button'
            onClick={handleSendMessage}
            className='w-[10%] flex items-center justify-center border-none bg-transparent hover:text-purple-500'
          >
            <SendIcon />
          </button>
        </aside>
      </div>
    </div>
  )
}