import { createContext, useEffect, useReducer } from 'react';
import {
  apiFetchActiveSession,
  apiLogin,
  apiLogout,
} from '../services/user-api';
import { IUser } from '../types/user';

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

export type UserAction = Login | Logout | Loading | FetchSession;

interface IUserContext {
  userState: {
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  };
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<boolean>;
  fetchActiveSession: () => Promise<void>;
}

export const UserContext = createContext<IUserContext>({
  userState: {
    user: null,
    isAuthenticated: true,
    isLoading: false,
  },
  login: async () => {},
  logout: async () => true,
  fetchActiveSession: async () => {},
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
    case 'user/fetchSession':
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

  async function fetchActiveSession() {
    dispatch({ type: 'user/loading' });

    const data: { user: IUser; isAuthenticated: boolean } =
      await apiFetchActiveSession();

    dispatch({
      type: 'user/fetchSession',
      payload: { user: data.user, isAuthenticated: data.isAuthenticated },
    });
  }

  const value = {
    userState,
    login,
    logout,
    fetchActiveSession,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
