import { createContext, useEffect, useReducer } from 'react';
import {
  apiAddMealToLog,
  apiCreateLog,
  apiFetchActiveSession,
  apiLogin,
  apiLogout,
  apiRegister,
  apiDeleteLog,
  apiDeleteMealFromLog,
} from '../services/user-api';
import { IMeal } from '../types/meal';
import { IUser } from '../types/user';
import { IPreIDLog } from '../types/pre-id-log';

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type Login = {
  type: 'user/login';
  payload: {
    user: IUser | null;
    isAuthenticated: boolean;
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
  };
};

type AddMealToLog = {
  type: 'user/addMealToLog';
  payload: IUser;
};

type CreateLog = {
  type: 'user/createLog';
  payload: IUser;
};

type DeleteLog = {
  type: 'user/deleteLog';
  payload: IUser;
};

type DeleteMealFromLog = {
  type: 'user/deleteMealFromLog';
  payload: IUser;
};

export type UserAction =
  | Login
  | Logout
  | Register
  | Loading
  | FetchSession
  | AddMealToLog
  | CreateLog
  | DeleteLog
  | DeleteMealFromLog;

interface IUserContext {
  userState: {
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
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
  deleteLog: (logId: string, userId: string) => Promise<void>;
  deleteMealFromLog: (
    mealId: string,
    logId: string,
    userId: string
  ) => Promise<void>;
}

export const UserContext = createContext<IUserContext>({
  userState: {
    user: null,
    isAuthenticated: true,
    isLoading: false,
  },
  login: async () => {},
  logout: async () => true,
  register: async () => {},
  fetchActiveSession: async () => {},
  addMealToLog: async () => {},
  createLog: async () => {},
  deleteLog: async () => {},
  deleteMealFromLog: async () => {},
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
      };
    case 'user/fetchSession':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false,
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
        user: action.payload,
        isLoading: false,
      };
    case 'user/deleteLog':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };

    case 'user/deleteMealFromLog':
      return {
        ...state,
        user: action.payload,
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
};

export default function UserProvider(props: UserProviderProps) {
  const [userState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchSession() {
      dispatch({ type: 'user/loading' });
      const data: { user: IUser; isAuthenticated: boolean } =
        await apiFetchActiveSession();
      dispatch({
        type: 'user/fetchSession',
        payload: { user: data.user, isAuthenticated: data.isAuthenticated },
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
    dispatch({
      type: 'user/login',
      payload: { user: data.user, isAuthenticated: data.isAuthenticated },
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

    dispatch({
      type: 'user/fetchSession',
      payload: { user: data.user, isAuthenticated: data.isAuthenticated },
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
    dispatch({ type: 'user/createLog', payload: data.user });
  }

  async function deleteLog(logId: string, userId: string) {
    dispatch({ type: 'user/loading' });
    const data: { user: IUser } = await apiDeleteLog(logId, userId);
    dispatch({ type: 'user/deleteLog', payload: data.user });
  }

  async function deleteMealFromLog(
    mealId: string,
    logId: string,
    userId: string
  ) {
    dispatch({ type: 'user/loading' });
    const data: { user: IUser } = await apiDeleteMealFromLog(
      mealId,
      logId,
      userId
    );
    dispatch({ type: 'user/deleteMealFromLog', payload: data.user });
  }

  const value = {
    userState,
    login,
    logout,
    register,
    fetchActiveSession,
    addMealToLog,
    createLog,
    deleteLog,
    deleteMealFromLog,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
