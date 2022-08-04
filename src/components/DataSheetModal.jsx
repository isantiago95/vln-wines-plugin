import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

const DataSheetModal = ({ isOpen, close, datasheet }) => {
  return (
    <Modal isOpen={isOpen} size='lg' centered toggle={close}>
      <ModalBody style={{ height: '74vh' }}>
        <iframe src={`${datasheet}#toolbar=0`} width='100%' height='100%'></iframe>
      </ModalBody>
    </Modal>
  );
};

export default DataSheetModal;
