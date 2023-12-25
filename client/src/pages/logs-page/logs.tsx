import CreateLogForm from '../../components/create-log-form/create-log-form';
import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';
import useUser from '../../hooks/useUser';

export default function Logs() {
  const { user } = useUser();

  return (
    <div>
      <PageHeader>Logs</PageHeader>
      <PageContentContainer>
        <CreateLogForm />
        {user?.logs.map((log) => (
          <div key={log._id}>{log.name}</div>
        ))}
      </PageContentContainer>
    </div>
  );
}
