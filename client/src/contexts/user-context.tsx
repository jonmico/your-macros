import { createContext, useState } from 'react';
import { ILog } from '../types/log';
import { IUser } from '../types/user';

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  logs: ILog[];
  setLogs: React.Dispatch<React.SetStateAction<ILog[]>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLog: ILog | null;
  setSelectedLog: React.Dispatch<React.SetStateAction<ILog | null>>;
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
  selectedLog: null,
  setSelectedLog: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider(props: UserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [logs, setLogs] = useState<ILog[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ILog | null>(
    user ? user.logs[user.logs.length - 1] : null
  );

  const value = {
    user,
    setUser,
    logs,
    setLogs,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    selectedLog,
    setSelectedLog,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
