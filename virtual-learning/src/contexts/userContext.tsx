"use client"

import { UserData } from '@/interfaces/user/UserData';
import { createContext, ReactElement, useContext, useState } from 'react';

interface UserContext {
  userData: UserData;
  setUserData: any;
}

const UserContext = createContext<UserContext | null>(null);

export function useUserContext(): UserContext {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children }: any): ReactElement {
  const [userData, setUserData] = useState<any>(null);

  console.log('USER CONTEXT RENDERED')

  return (
    <UserContext.Provider value={{
      setUserData,
      userData,
    }}>
      {children}
    </UserContext.Provider>
  );
}