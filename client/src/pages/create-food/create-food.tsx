import { NavLink, Outlet } from 'react-router-dom';
import PageHeader from '../../components/page-header/page-header';
import styles from './create-food.module.css';
import { FoodProvider } from '../../contexts/food-context';

export default function CreateFood() {
  return (
    <div>
      <PageHeader>Create Food</PageHeader>
      <div className={styles.createFoodContainer}>
        <CreateFoodNav />
        <FoodProvider>
          <Outlet />
        </FoodProvider>
      </div>
    </div>
  );
}

function CreateFoodNav() {
  return (
    <nav className={styles.createFoodNav}>
      <ul className={styles.createFoodNavList}>
        <li>
          <NavLink className={styles.link} to={'create-food-form'}>
            Create Food
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to={'your-food-form'}>
            YourFood
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
