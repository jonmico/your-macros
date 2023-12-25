import CreateLogForm from '../../components/create-log-form/create-log-form';
import LogHistory from '../../components/log-history/log-history';
import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';

export default function Logs() {
  return (
    <div>
      <PageHeader>Logs</PageHeader>
      <PageContentContainer>
        <CreateLogForm />
        <LogHistory />
      </PageContentContainer>
    </div>
  );
}
