import { createContext, useEffect, useReducer } from 'react';
import { ILog } from '../types/log';
import { IUser } from '../types/user';
import { apiFetchActiveSession, apiLogin } from '../services/user-api';

interface IUserContext {
  state: { user: IUser | null; isAuthenticated: boolean; isLoading: boolean };
  login: (email: string, password: string) => void;
  fetchActiveSession: () => void;
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

type FetchSession = {
  type: 'user/fetchActiveSession';
  payload: { user: IUser | null; isAuthenticated: boolean };
};

export type UserAction = InitializeUser | Loading | FetchSession;

export const UserContext = createContext<IUserContext>({
  state: {
    user: null,
    isAuthenticated: true,
    isLoading: false,
  },
  login: () => {},
  fetchActiveSession: () => {},
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
    case 'user/fetchActiveSession':
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
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchSession() {
      dispatch({ type: 'user/loading' });
      const data: { user: IUser; isAuthenticated: boolean } =
        await apiFetchActiveSession();
      dispatch({
        type: 'user/fetchActiveSession',
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

  async function fetchActiveSession() {
    dispatch({ type: 'user/loading' });

    const data: { user: IUser; isAuthenticated: boolean } =
      await apiFetchActiveSession();

    dispatch({
      type: 'user/fetchActiveSession',
      payload: { user: data.user, isAuthenticated: data.isAuthenticated },
    });
  }

  const value = {
    state,
    login,
    fetchActiveSession,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
