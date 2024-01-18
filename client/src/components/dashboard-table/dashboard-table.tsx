import { ILog } from '../../types/log';
import { IUser } from '../../types/user';
import DropDownMenu from '../drop-down-menu/drop-down-menu';
import styles from './dashboard-table.module.css';

export default function DashboardTable(props: { user: IUser }) {
  const remainingCalories = props.user.calories - props.selectedLog.calories;
  const remainingFat = props.user.macros.fat - props.selectedLog.macros.fat;
  const remainingCarbs =
    props.user.macros.carbs - props.selectedLog.macros.carbs;
  const remainingProtein =
    props.user.macros.protein - props.selectedLog.macros.protein;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardTableIntro}>
        <h3>
          Here is where you're at for your{' '}
          <span className={styles.selectedLog}>{props.selectedLog.name}</span>{' '}
          log:
        </h3>
        <DropDownMenu user={props.user} />
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
    </div>
  );
}
