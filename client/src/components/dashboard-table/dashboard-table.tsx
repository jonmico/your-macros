import { useState } from 'react';
import { IUser } from '../../types/user';
import styles from './dashboard-table.module.css';
import { ILog } from '../../types/log';
import DropDownMenu from '../drop-down-menu/drop-down-menu';

export default function DashboardTable(props: { user: IUser }) {
  const [selectedLog, setSelectedLog] = useState(
    props.user.logs[props.user.logs.length - 1]
  );

  const remainingCalories = props.user.calories - selectedLog.calories;
  const remainingFat = props.user.macros.fat - selectedLog.macros.fat;
  const remainingCarbs = props.user.macros.carbs - selectedLog.macros.carbs;
  const remainingProtein =
    props.user.macros.protein - selectedLog.macros.protein;

  function handleSelectLog(log: ILog) {
    setSelectedLog(log);
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardTableIntro}>
        <h4>
          Here is where you're at for your{' '}
          <span className={styles.selectedLog}>{selectedLog.name}</span> log:
        </h4>
        <DropDownMenu
          selectedLog={selectedLog}
          handleSelectLog={handleSelectLog}
        />
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
              {selectedLog.calories}cals
            </div>
            <div className={styles.consumedFat}>{selectedLog.macros.fat}f</div>
            <div className={styles.consumedCarbs}>
              {selectedLog.macros.carbs}c
            </div>
            <div className={styles.consumedProtein}>
              {selectedLog.macros.protein}p
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
    </div>
  );
}
