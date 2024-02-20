import { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import DashboardTable from '../../components/dashboard-table/dashboard-table';
import MacroDisplay from '../../components/macro-display/macro-display';
import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';
import useUser from '../../hooks/useUser';
import { ILog } from '../../types/log';
import { IMeal } from '../../types/meal';
import { IUser } from '../../types/user';
import styles from './dashboard.module.css';
import { useLogs } from '../../hooks/useLogs';
import Spinner from '../../components/spinner/spinner';

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
  const {
    logState: { logs, isLoading: isFetchingLogs },
  } = useLogs();

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
      {isFetchingLogs ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.dashboardContainer}>
          <DashboardTable
            logs={logs}
            user={props.user}
            selectedLog={selectedLog}
            handleSelectLog={handleSelectLog}
          />
          {selectedLog && <DashboardLogGrid selectedLog={selectedLog} />}
        </div>
      )}
    </PageContentContainer>
  );
}

function DashboardLogGrid(props: { selectedLog: ILog }) {
  return (
    <>
      {props.selectedLog.meals.length === 0 ? (
        <div className={styles.noMealsInLogContainer}>
          <h3>Meals for your current log will show here.</h3>

          <Link to={'/add-meal'}>Add a meal</Link>
        </div>
      ) : (
        <>
          <div className={styles.logGridHeader}>
            <h3>Meals for this log:</h3>
            <Link to={`/logs/${props.selectedLog._id}`}>View this log</Link>
          </div>
          <ul className={styles.dashboardLogGrid}>
            {props.selectedLog.meals.map((meal) => (
              <DashboardLogGridItem
                key={meal._id}
                selectedLog={props.selectedLog}
                meal={meal}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

function DashboardLogGridItem(props: { meal: IMeal; selectedLog: ILog }) {
  const [isListOpen, setIsListOpen] = useState(false);
  const numberOfMeals = props.meal.mealComponents.length;

  function handleClick() {
    setIsListOpen((prevState) => !prevState);
  }

  return (
    <li className={styles.dashboardLogGridItem} onClick={handleClick}>
      <div className={styles.gridItemMealHeader}>
        <div className={styles.gridItemMealNameMacros}>
          <h4>{props.meal.name}</h4>
          <div className={styles.macroContainer}>
            <div className={styles.calories}>{props.meal.calories}cals</div>
            <div className={styles.divider}>|</div>
            <div className={styles.fat}>{props.meal.macros.fat}f</div>
            <div className={styles.carbs}>{props.meal.macros.carbs}c</div>
            <div className={styles.protein}>{props.meal.macros.protein}p</div>
          </div>
        </div>
        <Link
          className={styles.linkToLog}
          to={`/logs/${props.selectedLog._id}`}
        >
          Go to log
        </Link>
      </div>
      <div className={styles.dropdownArrowContainer}>
        <FaAngleRight
          className={`${isListOpen ? styles.animateRightAngle : ''}`}
        />
        {!isListOpen && (
          <div>
            {numberOfMeals} {numberOfMeals === 1 ? 'food' : 'foods'} logged
          </div>
        )}
      </div>
      {isListOpen && (
        <ul className={styles.gridItemMealList}>
          {props.meal.mealComponents.map((food) => (
            <li className={styles.gridItemMealListItem} key={food.food._id}>
              <div className={styles.gridItemMealListItemNameBrand}>
                <div>{food.food.brand}</div>
                <div>{food.food.name}</div>
              </div>
              <div className={styles.gridItemMealListItemMacroServings}>
                <MacroDisplay
                  calories={food.food.calories}
                  macros={food.food.macros}
                  servings={food.servings}
                />
                <div>
                  {food.servings} {food.servings === 1 ? 'serving' : 'servings'}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
