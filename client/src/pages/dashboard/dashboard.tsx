import { useState } from 'react';
import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';
import useUser from '../../hooks/useUser';

import { IUser } from '../../types/user';
import styles from './dashboard.module.css';

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
        <h3>Howdy!</h3>
        <DashboardTable user={user} />
      </PageContentContainer>
    </>
  );
}

function DashboardTable(props: { user: IUser }) {
  const [selectedLog, setSelectedLog] = useState(props.user.logs[0]);

  const remainingCalories = props.user.calories - selectedLog.calories;
  const remainingFat = props.user.macros.fat - selectedLog.macros.fat;
  const remainingCarbs = props.user.macros.carbs - selectedLog.macros.carbs;
  const remainingProtein =
    props.user.macros.protein - selectedLog.macros.protein;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardTableIntro}>
        <h4>
          Here is where you're at for your{' '}
          <span className={styles.selectedLog}>{selectedLog.name}</span> log:
        </h4>
        <div>dropdown menu</div>
      </div>
      <div className={styles.dashboardTableContainer}>
        <div className={styles.dashboardTable}>
          <div className={styles.dashboardTableRow}>
            <div>Initial:</div>
            <div className={styles.number}>{props.user.calories}cals</div>
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
