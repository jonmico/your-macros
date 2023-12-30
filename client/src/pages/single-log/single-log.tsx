import { FaArrowLeft } from 'react-icons/fa6';
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
    <div className={styles.pageContainer}>
      <Link className={styles.link} to={'/logs'}>
        <FaArrowLeft /> <div>Back to Logs</div>
      </Link>
      <div className={styles.logContainer}>
        <div className={styles.nameAndDate}>
          <h2>{log.name}</h2>
          <div>
            <h4>Created:</h4>
            <div>{new Date(log.createdAt).toDateString()}</div>
          </div>
        </div>
        <div className={styles.macrosContainer}>
          <div className={styles.calories}>{log.calories}cals</div>
          <div className={styles.fat}>{log.macros.fat}f</div>
          <div className={styles.carbs}>{log.macros.carbs}c</div>
          <div className={styles.protein}>{log.macros.protein}p</div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          magnam quibusdam deserunt, similique non impedit, facere pariatur
          consequatur incidunt provident recusandae iusto ipsum ipsam voluptatem
          hic molestiae soluta, quasi vel. Magnam quidem quaerat aspernatur
          soluta harum qui minus voluptas molestias cumque similique eligendi,
          dolore nam suscipit in et nisi sunt. Rerum quisquam aperiam suscipit
          consequatur necessitatibus voluptate fugiat? Delectus, culpa!
          Quibusdam blanditiis laborum accusantium magnam dolor dolorum facere
          consequatur harum ducimus quia unde, corporis esse aspernatur officia
          quam laboriosam tempora eius iusto necessitatibus repellat doloremque
          accusamus! Dolorem, eos? Nisi, error. Voluptatibus rerum blanditiis
          iusto nulla, pariatur a suscipit eligendi fugiat alias officia,
          delectus quaerat error veritatis! Tenetur qui, perferendis sit quidem
          consequuntur, autem nemo error doloremque quam explicabo, earum
          veniam. Impedit ut cumque consectetur sint minus perferendis quaerat
          quam qui quia iste? Natus, commodi? Molestiae iste molestias laborum?
          Vero quod accusamus veniam nobis nam quia, praesentium dolorum illum?
          Eius, numquam.
        </p>
      </div>
    </div>
  );
}
