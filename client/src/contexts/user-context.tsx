import { createContext, useReducer, useState } from 'react';
import { ILog } from '../types/log';
import { IUser } from '../types/user';

interface IUserContext {
  // user: IUser | null;
  // setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  logs: ILog[];
  setLogs: React.Dispatch<React.SetStateAction<ILog[]>>;
  // isAuthenticated: boolean;
  // setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  // isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLog: ILog | null;
  setSelectedLog: React.Dispatch<React.SetStateAction<ILog | null>>;
}

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type InitializeUser = {
  type: 'user/login';
  payload: { user: IUser | null; isAuthenticated: boolean };
};

type Loading = {
  type: 'user/loading';
};

export type UserAction = InitializeUser | Loading;

export const UserContext = createContext<IUserContext>({
  // user: null,
  // setUser: () => {},
  logs: [],
  setLogs: () => {},
  // isAuthenticated: true,
  // setIsAuthenticated: () => {},
  // isLoading: false,
  // setIsLoading: () => {},
  selectedLog: null,
  setSelectedLog: () => {},
});

function reducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case 'user/login':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false,
      };
    case 'user/loading':
      return {
        ...state,
        isLoading: true,
      };

    default:
      throw TypeError('Action unknown.');
  }
}

const initialState: UserState = {
  user: null,
  isAuthenticated: true,
  isLoading: false,
};

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider(props: UserProviderProps) {
  // const [user, setUser] = useState<IUser | null>(null);
  const [logs, setLogs] = useState<ILog[]>([]);
  const [selectedLog, setSelectedLog] = useState<ILog | null>(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  // const [selectedLog, setSelectedLog] = useState<ILog | null>(
  //   user ? user.logs[user.logs.length - 1] : null
  // );

  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    dispatch,
    // setUser,
    logs,
    setLogs,
    // isAuthenticated,
    // setIsAuthenticated,
    // isLoading,
    // setIsLoading,
    selectedLog,
    setSelectedLog,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
