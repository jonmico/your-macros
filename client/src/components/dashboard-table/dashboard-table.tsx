import { useState } from 'react';
import { ILog } from '../../types/log';
import { IUser } from '../../types/user';
import CreateLogForm from '../create-log-form/create-log-form';
import DropDownMenu from '../drop-down-menu/drop-down-menu';
import Modal from '../modal/modal';
import styles from './dashboard-table.module.css';

export default function DashboardTable(props: {
  logs: ILog[];
  user: IUser;
  selectedLog: ILog | null;
  handleSelectLog: (log: ILog) => void;
}) {
  return (
    <div className={styles.dashboardContainer}>
      {props.user.logs.length === 0 ? (
        <DashboardTableNoLogs />
      ) : (
        <DashboardTableLogDisplay
          user={props.user}
          selectedLog={props.selectedLog}
          handleSelectLog={props.handleSelectLog}
        />
      )}
    </div>
  );
}

function DashboardTableLogDisplay(props: {
  user: IUser;
  selectedLog: ILog | null;
  handleSelectLog: (log: ILog) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (props.selectedLog === null) return null;

  const remainingCalories = props.user.calories - props.selectedLog.calories;
  const remainingFat = props.user.macros.fat - props.selectedLog.macros.fat;
  const remainingCarbs =
    props.user.macros.carbs - props.selectedLog.macros.carbs;
  const remainingProtein =
    props.user.macros.protein - props.selectedLog.macros.protein;
  return (
    <>
      <div className={styles.dashboardTableIntro}>
        <h3>
          Here is where you're at for your{' '}
          <span className={styles.selectedLog}>{props.selectedLog.name}</span>{' '}
          log:
        </h3>
        <div className={styles.logOptionsContainer}>
          <DropDownMenu
            user={props.user}
            selectedLog={props.selectedLog}
            handleSelectLog={props.handleSelectLog}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            type={'button'}
            className={styles.newLogButton}
          >
            New Log
          </button>
          {isModalOpen && (
            <Modal>
              <CreateLogForm handleCloseModal={() => setIsModalOpen(false)} />
            </Modal>
          )}
        </div>
      </div>
      <div className={styles.dashboardTableContainer}>
        <div className={styles.dashboardTable}>
          <div className={styles.dashboardTableRow}>
            <div>Initial:</div>
            <div className={styles.initialCals}>{props.user.calories}cals</div>
            <div className={styles.initialFat}>{props.user.macros.fat}f</div>
            <div className={styles.initialCarbs}>
              {props.user.macros.carbs}c
            </div>
            <div className={styles.initialProtein}>
              {props.user.macros.protein}p
            </div>
          </div>
          <div className={styles.dashboardTableRow}>
            <div>Consumed:</div>
            <div className={styles.consumedCals}>
              {props.selectedLog.calories}cals
            </div>
            <div className={styles.consumedFat}>
              {props.selectedLog.macros.fat}f
            </div>
            <div className={styles.consumedCarbs}>
              {props.selectedLog.macros.carbs}c
            </div>
            <div className={styles.consumedProtein}>
              {props.selectedLog.macros.protein}p
            </div>
          </div>
          <div className={styles.dashboardTableRow}>
            <div>Remaining:</div>
            <div className={styles.remainingCals}>{remainingCalories}cals</div>
            <div className={styles.remainingFat}>{remainingFat}f</div>
            <div className={styles.remainingCarbs}>{remainingCarbs}c</div>
            <div className={styles.remainingProtein}>{remainingProtein}p</div>
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardTableNoLogs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.noLogsContainer}>
      <h2>Looks empty {':('}</h2>
      <button onClick={() => setIsModalOpen(true)}>
        Click here to make your first log
      </button>
      {isModalOpen && (
        <Modal>
          <CreateLogForm handleCloseModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
