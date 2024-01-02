import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';
import useUser from '../../hooks/useUser';
import { IMacros } from '../../types/macros';

import styles from './dashboard.module.css';

export default function Dashboard() {
  return (
    <div>
      <PageHeader>Dashboard</PageHeader>
      <DashboardContent />
    </div>
  );
}

function DashboardContent() {
  const { user } = useUser();

  if (!user) return null;
  return (
    <>
      <PageContentContainer>
        <MacrosAndCalories calories={user.calories} macros={user.macros} />
      </PageContentContainer>
    </>
  );
}

interface MacrosAndCaloriesProps {
  calories: number;
  macros: IMacros;
}

function MacrosAndCalories(props: MacrosAndCaloriesProps) {
  return (
    <div className={styles.macrosAndCaloriesContainer}>
      <div>{props.calories}</div>
      <div>{props.macros.fat}</div>
      <div>{props.macros.carbs}</div>
      <div>{props.macros.protein}</div>
    </div>
  );
}
