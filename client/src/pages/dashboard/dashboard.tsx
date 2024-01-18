import DashboardTable from '../../components/dashboard-table/dashboard-table';
import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';
import useUser from '../../hooks/useUser';
import { ILog } from '../../types/log';
import { IUser } from '../../types/user';

import { Link, useNavigate } from 'react-router-dom';
import { IMeal } from '../../types/meal';
import styles from './dashboard.module.css';
import { useState } from 'react';

export default function Dashboard() {
  return (
    <div>
      <PageHeader>Dashboard</PageHeader>
      <DashboardContent />
    </div>
  );
}

function DashboardContent() {
  const {
    userState: { user, activeLog },
  } = useUser();

  if (!user) return null;

  return (
    <PageContentContainer>
      <div className={styles.dashboardContainer}>
        {user.logs.length === 0 ? (
          <>
            <div>You don't have any logs yet☹️</div>
            <div>
              Click <Link to={'/logs'}>here</Link> to make your first log!
            </div>
          </>
        ) : (
          <>
            {/* <DashboardTable user={user} /> */}
            <DashboardLogGrid />
          </>
        )}
      </div>
    </PageContentContainer>
  );
}

function DashboardLogGrid() {
  const {
    userState: { activeLog },
  } = useUser();

  if (!activeLog) return <div>no</div>;

  return (
    <>
      <h3>Meals for this log:</h3>
      <ul className={styles.dashboardLogGrid}>
        {activeLog.meals.map((meal) => (
          <DashboardLogGridItem
            key={meal._id}
            logId={activeLog._id}
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
