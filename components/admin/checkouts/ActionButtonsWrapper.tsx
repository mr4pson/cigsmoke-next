import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styles from './checkouts.module.scss';
import { handleDeleteClick } from './helpers';

type Props = {
  id: string;
};

const ActionButtonsWrapper: React.FC<Props> = ({ id }) => {
  const [visible, setVisible] = useState(false);
  const isLoading = useAppSelector((state) => state.checkouts.loading);
  const dispatch = useAppDispatch();

  const showOrDontModal = () => {
    setVisible(!visible);
  };

  return (
    <>
      <span className={styles.deleteButtonSpan}>
        <Tooltip title="Удалить">
          <Button
            type="default"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={showOrDontModal}
          />
        </Tooltip>
      </span>
      <Modal
        title="Подтвердите действие."
        visible={visible}
        onOk={handleDeleteClick(id, dispatch, setVisible)}
        confirmLoading={isLoading}
        onCancel={showOrDontModal}
      >
        <p>Вы уверены, что хотите удалить заказ с ID {id}?</p>
      </Modal>
    </>
  );
};

export default ActionButtonsWrapper;
