import { useContext } from 'react';
import { UserContext } from '../contexts/user-context';

export default function useUser() {
  const value = useContext(UserContext);
  if (!value) {
    throw new Error('UserContext accessed outside UserProvider');
  }
  return value;
}
