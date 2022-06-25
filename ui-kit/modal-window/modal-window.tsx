// import { CloseIcon } from 'public/icons/close-icon';
import { ReactNode } from 'react';
import Modal from 'react-modal';
import styles from './modal-window.module.scss';

type Props = {
  title?: string;
  isModalOpen: boolean;
  children: ReactNode;
  afterOpenModal?: () => void;
  handleClose: () => void;
}

const ModalWindow = ({
  title,
  isModalOpen,
  children,
  handleClose,
  afterOpenModal,
}: Props) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '1001',
    },
  };

  return (
    <Modal
      className={styles['modal']}
      isOpen={isModalOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={styles['modal__header']}>
        <h2 className={styles['modal__title']}>{title}</h2>
        <button className={styles['modal__close-btn']} onClick={handleClose}>
          {/* <CloseIcon className={styles['modal__close-btn-icon']} /> */}
        </button>
      </div>
      <div className={styles['modal__body']}>{children}</div>
    </Modal>
  )
}

export default ModalWindow;
