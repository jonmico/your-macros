import { Link, Outlet } from 'react-router-dom';
import PageHeader from '../../components/page-header/page-header';
import styles from './create-food.module.css';

export default function CreateFood() {
  return (
    <div>
      <PageHeader>Create Food</PageHeader>
      <div className={styles.formContainer}>
        <Link to={'food-form'}>CreateFoodForm</Link>
        <Outlet />
      </div>
    </div>
  );
}
