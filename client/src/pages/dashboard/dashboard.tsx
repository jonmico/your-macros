import DashboardTable from '../../components/dashboard-table/dashboard-table';
import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';
import useUser from '../../hooks/useUser';
import { ILog } from '../../types/log';
import { IUser } from '../../types/user';

import { useNavigate } from 'react-router-dom';
import { IMeal } from '../../types/meal';
import styles from './dashboard.module.css';
import { useState } from 'react';

export default function Dashboard() {
  const {
    userState: { user },
  } = useUser();

  if (!user) return null;

  return (
    <div>
      <PageHeader>Dashboard</PageHeader>
      <DashboardContent user={user} />
    </div>
  );
}

function DashboardContent(props: { user: IUser }) {
  const [selectedLog, setSelectedLog] = useState(
    props.user.logs.length > 0
      ? props.user.logs[props.user.logs.length - 1]
      : null
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
    <>
      <h3>Meals for this log:</h3>
      <ul className={styles.dashboardLogGrid}>
        {props.selectedLog.meals.map((meal) => (
          <DashboardLogGridItem
            key={meal._id}
            logId={props.selectedLog._id}
            meal={meal}
          />
        ))}
      </ul>
    </>
  );
}

function DashboardLogGridItem(props: { meal: IMeal; logId: string }) {
  const navigate = useNavigate();

  const numberOfMeals = props.meal.mealComponents.length;

  function handleClick() {
    navigate(`/logs/${props.logId}`);
  }

  return (
    <li className={styles.dashboardLogGridItem} onClick={handleClick}>
      <h4>{props.meal.name}</h4>
      <div className={styles.macroContainer}>
        <div className={styles.calories}>{props.meal.calories}cals</div>
        <div className={styles.divider}>|</div>
        <div className={styles.fat}>{props.meal.macros.fat}f</div>
        <div className={styles.carbs}>{props.meal.macros.carbs}c</div>
        <div className={styles.protein}>{props.meal.macros.protein}p</div>
      </div>
      <div>
        {numberOfMeals} {numberOfMeals === 1 ? 'food' : 'foods'} logged
      </div>
    </li>
  );
}
