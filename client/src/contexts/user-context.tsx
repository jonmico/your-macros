import { createContext, useState } from 'react';
import { IUser } from '../types/user';

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  isAuthenticated: true,
  setIsAuthenticated: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider(props: UserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const value = { user, setUser, isAuthenticated, setIsAuthenticated };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
