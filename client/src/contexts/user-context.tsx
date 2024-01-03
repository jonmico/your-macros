import { createContext, useState } from 'react';
import { IUser } from '../types/user';
import { ILog } from '../types/log';

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  logs: ILog[];
  setLogs: React.Dispatch<React.SetStateAction<ILog[]>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  logs: [],
  setLogs: () => {},
  isAuthenticated: true,
  setIsAuthenticated: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider(props: UserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [logs, setLogs] = useState<ILog[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    user,
    setUser,
    logs,
    setLogs,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
