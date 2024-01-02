import PageHeader from '../../components/page-header/page-header';
import PageContentContainer from '../../components/page-content/page-content-container';
import useUser from '../../hooks/useUser';
import MacroDisplay from '../../components/macro-display/macro-display';

export default function Dashboard() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div>
      <PageHeader>Dashboard</PageHeader>
      <PageContentContainer>
        <MacroDisplay calories={user.calories} macros={user.macros} />
      </PageContentContainer>
    </div>
  );
}
