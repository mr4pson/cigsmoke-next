import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';
import styles from './categories.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { deleteCategory } from "../../redux/slicers/categoriesSlicer"
import { useState } from 'react';
import { useRouter } from 'next/router';

const ActionButtonsWrapper = ({id}) => {
    const [visible, setVisible] = useState(false);

    const router = useRouter()

    const categories = useAppSelector(state => state.categories.categoriesList)
    const isLoading = useAppSelector(state => state.categories.loading)
    const dispatch = useAppDispatch()

    const showOrDontModal = () => {
        setVisible(!visible);
    };

    const handleDeleteClick = () => {
        dispatch(deleteCategory(id))
    }

    const handleRedirectEdit = () => {
        router.push(`/categories/edit-category/${id}`)
    }

    return (<>
    <span>
        <Tooltip title="Изменить">
            <Button 
            type="default" 
            shape="circle" 
            icon={<EditOutlined 
            onClick={handleRedirectEdit}
            />} />
        </Tooltip>
    </span>
    <span className={styles.deleteButtonSpan}>
        <Tooltip title="Удалить">
            <Button 
            type="default" 
            shape="circle" 
            icon={<DeleteOutlined 
            onClick={showOrDontModal}
            />} />
        </Tooltip>
    </span>

      <Modal
        title="Подтвердите действие."
        visible={visible}
        onOk={handleDeleteClick}
        confirmLoading={isLoading}
        onCancel={showOrDontModal}
      >
        <p>Вы уверены, что хотите удалить категорию с ID {id}?</p>
      </Modal>
    </>)
}

export default ActionButtonsWrapper