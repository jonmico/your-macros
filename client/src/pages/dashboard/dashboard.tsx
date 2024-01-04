import { useState } from 'react';
import DashboardTable from '../../components/dashboard-table/dashboard-table';
import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';
import useUser from '../../hooks/useUser';
import { IUser } from '../../types/user';
import { ILog } from '../../types/log';

import styles from './dashboard.module.css';
import { IMeal } from '../../types/meal';

export default function Dashboard() {
  const { user, logs } = useUser();

  if (!user || logs.length === 0) return null;

  return (
    <div>
      <PageHeader>Dashboard</PageHeader>
      <DashboardContent user={user} />
    </div>
  );
}

function DashboardContent(props: { user: IUser }) {
  const [selectedLog, setSelectedLog] = useState(
    props.user.logs[props.user.logs.length - 1]
  );

  function handleSelectLog(log: ILog) {
    setSelectedLog(log);
  }
  return (
    <PageContentContainer>
      <div className={styles.dashboardContainer}>
        <DashboardTable
          user={props.user}
          selectedLog={selectedLog}
          handleSelectLog={handleSelectLog}
        />
        <DashboardLogGrid selectedLog={selectedLog} />
      </div>
    </PageContentContainer>
  );
}

function DashboardLogGrid(props: { selectedLog: ILog }) {
  if (props.selectedLog.meals.length === 0)
    return <div>NO MEALS DO SOMETHING ABOUT MEEEEE</div>;

  return (
    <ul className={styles.dashboardLogGrid}>
      {props.selectedLog.meals.map((meal) => (
        <DashboardLogGridItem key={meal._id} meal={meal} />
      ))}
    </ul>
  );
}

function DashboardLogGridItem(props: { meal: IMeal }) {
  return (
    <li className={styles.dashboardLogGridItem}>
      <h4>{props.meal.name}</h4>
      <div>{props.meal.calories}</div>
    </li>
  );
}
