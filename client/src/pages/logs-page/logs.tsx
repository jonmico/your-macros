import PageHeader from '../../components/page-header/page-header';
import CreateLogForm from '../../components/create-log-form/create-log-form';
import PageContentContainer from '../../components/page-content/page-content-container';

export default function Logs() {
  return (
    <div>
      <PageHeader>Logs</PageHeader>
      <PageContentContainer>
        <CreateLogForm />
      </PageContentContainer>
    </div>
  );
}
