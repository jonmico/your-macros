import { createContext, useReducer, useState } from 'react';
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

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type InitializeUser = {
  type: 'user/initialize';
  payload: { user: IUser; isAuthenticated: boolean };
};

export type UserActions = InitializeUser;

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

function reducer(state: UserState, action: UserActions) {
  switch (action.type) {
    case 'user/initialize':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false,
      };
    default:
      throw TypeError('Action unknown.');
  }
}

const initialState = {
  user: null,
  isAuthenticated: true,
  isLoading: false,
};

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

  const [state, dispatch] = useReducer(reducer, initialState);

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
