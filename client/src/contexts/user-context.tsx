import { createContext, useState } from 'react';
import { IUser } from '../types/user';
import { ILog } from '../types/log';
import { IYourFood } from '../types/your-food';

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  logs: ILog[];
  setLogs: React.Dispatch<React.SetStateAction<ILog[]>>;
  yourFoods: IYourFood[];
  setYourFoods: React.Dispatch<React.SetStateAction<IYourFood[]>>;
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
  yourFoods: [],
  setYourFoods: () => {},
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
  const [yourFoods, setYourFoods] = useState<IYourFood[]>([]);
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
    yourFoods,
    setYourFoods,
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
