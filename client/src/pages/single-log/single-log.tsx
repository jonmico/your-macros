import { Link, useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import styles from './single-log.module.css';

export default function SingleLog() {
  const { user } = useUser();
  const { logId } = useParams();

  const log = user.logs?.find((log) => log._id === logId);

  if (!log) {
    return <div>Hmm. Looks like we can't find that log!</div>;
  }

  console.log(log);

  return (
    <div>
      <div className={styles.header}>
        <Link className={styles.link} to={'/logs'}>
          Back to Logs
        </Link>
      </div>
      <ul>
        {log?.meals.map((meal) => (
          <li>{meal.name}</li>
        ))}
      </ul>
    </div>
  );
}
