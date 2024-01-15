import { FaArrowLeft } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import styles from './single-log.module.css';
import LogMealListItem from '../../components/log-meal-list-item/log-meal-list-item';

export default function SingleLog() {
  const {
    userState: { user },
  } = useUser();

  const { logId } = useParams();

  if (!user) return null;

  const log = user.logs.find((log) => log._id === logId);

  if (!log) {
    return <div>Hmm. Looks like we can't find that log!</div>;
  }

  const date = new Date(log.createdAt).toDateString();

  console.log(log);

  return (
    <div className={styles.pageContainer}>
      <Link className={styles.link} to={'/logs'}>
        <FaArrowLeft /> <div>Back to Logs</div>
      </Link>
      <div className={styles.logContainer}>
        <div className={styles.nameAndDate}>
          <h2>{log.name}</h2>
          <div>
            <h4>Created:</h4>
            <div>{date}</div>
          </div>
        </div>
        <div className={styles.macrosContainer}>
          <div className={styles.calories}>{log.calories}cals</div>
          <div className={styles.fat}>{log.macros.fat}f</div>
          <div className={styles.carbs}>{log.macros.carbs}c</div>
          <div className={styles.protein}>{log.macros.protein}p</div>
        </div>
        <LogMealList>
          {log.meals.map((meal, index) => (
            <LogMealListItem
              key={meal._id}
              meal={meal}
              index={index}
              mealLength={log.meals.length}
            />
          ))}
        </LogMealList>
      </div>
    </div>
  );
}

function LogMealList(props: { children: React.ReactNode }) {
  return <ul className={styles.logMealList}>{props.children}</ul>;
}
