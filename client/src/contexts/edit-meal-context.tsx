import { createContext, useState } from 'react';
import { ILog } from '../types/log';

interface IEditMealContext {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  log: ILog;
  setLog: React.Dispatch<React.SetStateAction<ILog>>;
}

export const EditMealContext = createContext<IEditMealContext | null>(null);

export function EditMealProvider(props: {
  children: React.ReactNode;
  log: ILog;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [log, setLog] = useState(props.log);

  const value = { isEditing, setIsEditing, log, setLog };

  return (
    <EditMealContext.Provider value={value}>
      {props.children}
    </EditMealContext.Provider>
  );
}
