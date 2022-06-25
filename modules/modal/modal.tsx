import ModalWindow from "ui-kit/modal-window"
import { useModal } from "./use-modal";
import styles from './modal.module.scss';

type Props = {
  text: string;
  title: string;
  date: string | JSX.Element;
  modalIsOpen: boolean;
  handleClose: () => void;
}

const Modal = ({
  title,
  text,
  date,
  modalIsOpen,
  handleClose,
}: Props): JSX.Element => {

  return (
    <ModalWindow
      title={title}
      isModalOpen={modalIsOpen}
      handleClose={handleClose}
    >
      <div className={styles['modal__content']}>
        <span className={styles['modal__text']}>
          {text}
        </span>
        <span className={styles['modal__date']}>
          {date}
        </span>
      </div>
    </ModalWindow>
  )
}

export default Modal;