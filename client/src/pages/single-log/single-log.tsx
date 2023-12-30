import { useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';

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
      <h3>Hello, this is the single log page!~~~~</h3>
      <ul>
        {log?.meals.map((meal) => (
          <li>{meal.name}</li>
        ))}
      </ul>
    </div>
  );
}
