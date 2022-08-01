import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

const DataSheetModal = ({ isOpen, close, datasheet }) => {
  return (
    <Modal isOpen={isOpen} size='lg' centered toggle={close}>
      <ModalBody>
        <iframe src={`${datasheet}#toolbar=0`} width='100%' height='auto'></iframe>
      </ModalBody>
    </Modal>
  );
};

export default DataSheetModal;
