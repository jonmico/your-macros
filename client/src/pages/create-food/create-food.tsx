import CreateFoodForm from '../../components/create-food-form/create-food-form';
import PageHeader from '../../components/page-header/page-header';
import styles from './create-food.module.css';

export default function CreateFood() {
  return (
    <div>
      <PageHeader>Create Food</PageHeader>
      <div className={styles.createFoodContainer}>
        <CreateFoodForm />
      </div>
    </div>
  );
}
