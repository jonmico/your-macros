import CreateLogForm from '../../components/create-log-form/create-log-form';
import LogHistory from '../../components/log-history/log-history';
import PageContentContainer from '../../components/page-content/page-content-container';
import PageHeader from '../../components/page-header/page-header';
import Modal from '../../components/modal/modal';
import { useState } from 'react';
import Button from '../../components/button/button';
import styles from './logs.module.css';

export default function Logs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <PageHeader>Logs</PageHeader>
      <PageContentContainer>
        <div className={styles.logsPageContainer}>
          {isModalOpen && (
            <Modal>
              <CreateLogForm handleCloseModal={handleCloseModal} />
            </Modal>
          )}

          <div className={styles.buttonContainer}>
            <Button btnStyle={'primary'} onClick={() => setIsModalOpen(true)}>
              New Log
            </Button>
          </div>

          <LogHistory />
        </div>
      </PageContentContainer>
    </div>
  );
}
