'use client';

import { UserData } from '@/interfaces/user/UserData';
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import { fetchData } from '@/services/fetchData';
import { useAuthContext } from './authContext';

interface UserContext {
  userData: UserData | null;
  setUserData: any;
  loadUserInfos: () => Promise<void>;
}

const UserContext = createContext<UserContext | null>(null);

export function useUserContext(): UserContext {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children }: { children: ReactNode}): ReactElement {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { userRole } = useAuthContext();

  async function loadUserInfos() {
    const PATH = '/profile';
    const { id, first_name, last_name, email, profilePictureFile, gender } =
      await fetchData({ url: PATH });

    setUserData({
      id,
      first_name,
      last_name,
      email,
      profile_picture: profilePictureFile,
      gender: gender || 'none',
    });
  }

  useEffect(() => {
    if (userRole) {
      loadUserInfos();
    }
  }, [userRole]);

  return (
    <UserContext.Provider
      value={{
        setUserData,
        userData,
        loadUserInfos,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
