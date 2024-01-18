import { createContext, useEffect, useReducer } from 'react';
import {
  apiAddMealToLog,
  apiCreateLog,
  apiFetchActiveSession,
  apiLogin,
  apiLogout,
  apiRegister,
  apiSelectActiveLog,
} from '../services/user-api';
import { IMeal } from '../types/meal';
import { IUser } from '../types/user';
import { IPreIDLog } from '../types/pre-id-log';
import { ILog } from '../types/log';

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  activeLog: ILog | null | undefined;
}

type Login = {
  type: 'user/login';
  payload: {
    user: IUser | null;
    isAuthenticated: boolean;
    activeLog: ILog | undefined | null;
  };
};

type Logout = {
  type: 'user/logout';
};

type Register = {
  type: 'user/register';
  payload: {
    user: IUser;
    isAuthenticated: boolean;
  };
};

type Loading = {
  type: 'user/loading';
};

type FetchSession = {
  type: 'user/fetchSession';
  payload: {
    user: IUser | null;
    isAuthenticated: boolean;
    activeLog: ILog | null | undefined;
  };
};

type AddMealToLog = {
  type: 'user/addMealToLog';
  payload: IUser;
};

type CreateLog = {
  type: 'user/createLog';
  payload: {
    user: IUser;
    activeLog: ILog | undefined;
  };
};

type SetActiveLog = {
  type: 'user/setActiveLog';
  payload: {
    activeLog: ILog | null | undefined;
    user: IUser;
  };
};

export type UserAction =
  | Login
  | Logout
  | Register
  | Loading
  | FetchSession
  | AddMealToLog
  | CreateLog
  | SetActiveLog;

interface IUserContext {
  userState: {
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    activeLog: ILog | null | undefined;
  };
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<boolean>;
  register: (
    email: string,
    password: string,
    macros: { fat: number; carbs: number; protein: number },
    calories: number
  ) => Promise<void>;
  fetchActiveSession: () => Promise<void>;
  addMealToLog: (meal: IMeal, logId: string, userId: string) => Promise<void>;
  createLog: (log: IPreIDLog) => Promise<void>;
  setActiveLog: (userId: string, log: ILog | null | undefined) => Promise<void>;
}

export const UserContext = createContext<IUserContext>({
  userState: {
    user: null,
    isAuthenticated: true,
    isLoading: false,
    activeLog: null,
  },
  setActiveLog: async () => {},
  login: async () => {},
  logout: async () => true,
  register: async () => {},
  fetchActiveSession: async () => {},
  addMealToLog: async () => {},
  createLog: async () => {},
});

function reducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case 'user/login':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false,
        activeLog: action.payload.activeLog,
      };
    case 'user/logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'user/register':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false,
        activeLog: undefined,
      };
    case 'user/fetchSession':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false,
        activeLog: action.payload.activeLog,
      };
    case 'user/addMealToLog':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case 'user/loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'user/createLog':
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        activeLog: action.payload.activeLog,
      };
    case 'user/setActiveLog':
      return {
        ...state,
        user: action.payload.user,
        activeLog: action.payload.activeLog,
        isLoading: false,
      };
    default:
      throw TypeError('Action unknown.');
  }
}

interface UserProviderProps {
  children: React.ReactNode;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: true,
  isLoading: false,
  activeLog: null,
};

export default function UserProvider(props: UserProviderProps) {
  const [userState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchSession() {
      dispatch({ type: 'user/loading' });
      const data: { user: IUser; isAuthenticated: boolean } =
        await apiFetchActiveSession();
      const activeLog = data.user.logs.find(
        (log) => log._id === data.user.activeLog
      );
      dispatch({
        type: 'user/fetchSession',
        payload: {
          user: data.user,
          isAuthenticated: data.isAuthenticated,
          activeLog,
        },
      });
    }
    fetchSession();
  }, []);

  async function login(email: string, password: string) {
    dispatch({ type: 'user/loading' });
    const data: { user: IUser; isAuthenticated: boolean } = await apiLogin(
      email,
      password
    );
    const activeLog = data.user.logs.find(
      (log) => log._id === data.user.activeLog
    );

    dispatch({
      type: 'user/login',
      payload: {
        user: data.user,
        isAuthenticated: data.isAuthenticated,
        activeLog: activeLog,
      },
    });
  }

  async function logout() {
    dispatch({ type: 'user/loading' });
    const data: { successfulLogout: boolean } = await apiLogout();

    if (data.successfulLogout) {
      dispatch({ type: 'user/logout' });
      return true;
    }

    return false;
  }

  async function register(
    email: string,
    password: string,
    macros: { fat: number; carbs: number; protein: number },
    calories: number
  ) {
    dispatch({ type: 'user/loading' });
    const data = await apiRegister(email, password, macros, calories);
    if (data.successfulRegister) {
      dispatch({
        type: 'user/register',
        payload: { user: data.user, isAuthenticated: data.isAuthenticated },
      });
    }
  }

  async function fetchActiveSession() {
    dispatch({ type: 'user/loading' });

    const data: { user: IUser; isAuthenticated: boolean } =
      await apiFetchActiveSession();
    const activeLog = data.user.logs.find(
      (log) => log._id === data.user.activeLog
    );
    dispatch({
      type: 'user/fetchSession',
      payload: {
        user: data.user,
        isAuthenticated: data.isAuthenticated,
        activeLog,
      },
    });
  }

  async function addMealToLog(meal: IMeal, logId: string, userId: string) {
    dispatch({ type: 'user/loading' });
    const data: { user: IUser } = await apiAddMealToLog(meal, logId, userId);

    dispatch({ type: 'user/addMealToLog', payload: data.user });
  }

  async function createLog(log: IPreIDLog) {
    dispatch({ type: 'user/loading' });
    const data: { user: IUser } = await apiCreateLog(log);
    const activeLog = data.user.logs.find(
      (log) => log._id === data.user.activeLog
    );
    dispatch({
      type: 'user/createLog',
      payload: { user: data.user, activeLog },
    });
  }

  async function setActiveLog(userId: string, log: ILog | null | undefined) {
    dispatch({ type: 'user/loading' });

    const data: { user: IUser } = await apiSelectActiveLog(userId, log?._id);

    const newActiveLog = data.user.logs.find((l) => l._id === log._id);

    dispatch({
      type: 'user/setActiveLog',
      payload: { activeLog: newActiveLog, user: data.user },
    });
  }

  const value = {
    userState,
    login,
    logout,
    register,
    fetchActiveSession,
    addMealToLog,
    createLog,
    setActiveLog,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
