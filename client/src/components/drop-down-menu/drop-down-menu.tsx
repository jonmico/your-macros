import { useState } from 'react';
import { ILog } from '../../types/log';
import styles from './drop-down-menu.module.css';
import { FaAngleLeft } from 'react-icons/fa6';
import { IUser } from '../../types/user';

export default function DropDownMenu(props: {
  user: IUser;
  selectedLog: ILog;
  handleSelectLog: (log: ILog) => void;
}) {
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);
  const { logs } = props.user;

  function handleSelectLogClick(
    evt: React.MouseEvent<HTMLLIElement, MouseEvent>,
    log: ILog
  ) {
    evt.stopPropagation();
    props.handleSelectLog(log);
    setIsDropDownMenuOpen(false);
  }

  return (
    <div
      className={styles.dropDownMenu}
      onClick={() => setIsDropDownMenuOpen((prevState) => !prevState)}
    >
      <button className={styles.dropDownButton}>
        <div>{props.selectedLog.name}</div>
        <div className={styles.dropDownIconContainer}>
          <FaAngleLeft
            className={`${
              isDropDownMenuOpen ? styles.animateDropDownButton : ''
            }`}
          />
        </div>
      </button>
      {isDropDownMenuOpen && (
        <ul className={styles.dropDownMenuList}>
          {logs.map((log) => (
            <DropDownMenuListItem
              handleClick={handleSelectLogClick}
              log={log}
              key={log._id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function DropDownMenuListItem(props: {
  log: ILog;
  handleClick: (
    evt: React.MouseEvent<HTMLLIElement, MouseEvent>,
    log: ILog
  ) => void;
}) {
  const date = new Date(props.log.createdAt).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <li
      className={styles.dropDownMenuListItem}
      onClick={(evt) => props.handleClick(evt, props.log)}
      key={props.log._id}
    >
      <div>{props.log.name}</div>
      <div>{date}</div>
    </li>
  );
}
