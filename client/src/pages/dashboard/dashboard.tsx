import { useState } from 'react';
import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';
import useUser from '../../hooks/useUser';
import { FaAngleLeft } from 'react-icons/fa6';
import { IUser } from '../../types/user';
import styles from './dashboard.module.css';
import { ILog } from '../../types/log';

export default function Dashboard() {
  return (
    <div>
      <PageHeader>Dashboard</PageHeader>
      <DashboardContent />
    </div>
  );
}

function DashboardContent() {
  const { user } = useUser();

  if (!user || user.logs.length === 0) return null;

  return (
    <>
      <PageContentContainer>
        {/* <h3>Howdy!</h3> */}
        <DashboardTable user={user} />
      </PageContentContainer>
    </>
  );
}

function DashboardTable(props: { user: IUser }) {
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
          logs={props.user.logs}
          handleSelectLog={handleSelectLog}
        />
      </div>
      <div className={styles.dashboardTableContainer}>
        <div className={styles.dashboardTable}>
          <div className={styles.dashboardTableRow}>
            <div>Initial:</div>
            <div className={styles.initialCals}>{props.user.calories}cals</div>
            <div className={styles.number}>{props.user.macros.fat}f</div>
            <div className={styles.number}>{props.user.macros.carbs}c</div>
            <div className={styles.number}>{props.user.macros.protein}p</div>
          </div>
          <div className={styles.dashboardTableRow}>
            <div>Consumed:</div>
            <div className={styles.number}>{selectedLog.calories}cals</div>
            <div className={styles.number}>{selectedLog.macros.fat}f</div>
            <div className={styles.number}>{selectedLog.macros.carbs}c</div>
            <div className={styles.number}>{selectedLog.macros.protein}p</div>
          </div>
          <div className={styles.dashboardTableRow}>
            <div>Remaining:</div>
            <div className={styles.number}>{remainingCalories}cals</div>
            <div className={styles.number}>{remainingFat}f</div>
            <div className={styles.number}>{remainingCarbs}c</div>
            <div className={styles.number}>{remainingProtein}p</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropDownMenu(props: {
  selectedLog: ILog;
  logs: ILog[];
  handleSelectLog: (log: ILog) => void;
}) {
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);

  return (
    <div className={styles.dropDownMenu}>
      <button
        onClick={() => setIsDropDownMenuOpen((prevState) => !prevState)}
        className={styles.dropDownButton}
      >
        <div className={styles.dropDownMenuSelectedLog}>
          {props.selectedLog.name}
        </div>
        <div className={styles.dropDownIconContainer}>
          <FaAngleLeft
            className={`${
              isDropDownMenuOpen ? styles.animateDropDownButton : ''
            }`}
          />
        </div>
      </button>
    </div>
  );
}
