import { Outlet } from 'react-router-dom';
import PageHeader from '../../components/page-header/page-header';
import styles from './create-food.module.css';
import { FoodProvider } from '../../contexts/food-context';

export default function CreateFood() {
  return (
    <div>
      <PageHeader>Create Food</PageHeader>
      <div className={styles.createFoodContainer}>
        <FoodProvider>
          <Outlet />
        </FoodProvider>
      </div>
    </div>
  );
}
