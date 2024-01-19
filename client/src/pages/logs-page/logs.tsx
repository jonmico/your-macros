import CreateLogForm from '../../components/create-log-form/create-log-form';
import LogHistory from '../../components/log-history/log-history';
import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';
import Modal from '../../components/modal/modal';
import { useState } from 'react';
import Button from '../../components/button/button';

export default function Logs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <PageHeader>Logs</PageHeader>
      <PageContentContainer>
        {isModalOpen ? (
          <Modal>
            <CreateLogForm handleCloseModal={handleCloseModal} />
          </Modal>
        ) : (
          <Button type={'primary'} onClick={() => setIsModalOpen(true)}>
            New Log
          </Button>
        )}
        <LogHistory />
      </PageContentContainer>
    </div>
  );
}
