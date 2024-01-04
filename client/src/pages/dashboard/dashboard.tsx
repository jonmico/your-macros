import DashboardTable from '../../components/dashboard-table/dashboard-table';
import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';
import useUser from '../../hooks/useUser';

export default function Dashboard() {
  return (
    <div>
      <PageHeader>Dashboard</PageHeader>
      <DashboardContent />
    </div>
  );
}

function DashboardContent() {
  const { user, logs } = useUser();

  if (!user || logs.length === 0) return null;

  return (
    <>
      <PageContentContainer>
        <DashboardTable user={user} />
      </PageContentContainer>
    </>
  );
}
