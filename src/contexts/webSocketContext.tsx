'use client'

import { io, Socket } from 'socket.io-client'
import { createContext, ReactElement, useContext } from 'react';

export const socket = io('http://localhost:5000');

interface WebSocketContextProps {
  socket: Socket;
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
}

export function WebSocketProvider({ children }: any): ReactElement {

  return (
    <WebSocketContext.Provider value={{
      socket
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}