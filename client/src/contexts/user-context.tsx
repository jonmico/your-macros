import { createContext, useState } from 'react';
import { IUser } from '../types/user';

interface IUserContext {
  user: IUser | null;
}

export const UserContext = createContext<IUserContext>({ user: null });

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider(props: UserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const value = { user };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
