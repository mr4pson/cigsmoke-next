import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import styles from './categories.module.scss';
import { useAppDispatch } from 'redux/hooks';
import { deleteCategory } from "../../redux/slicers/categoriesSlicer"

const ActionButtonsWrapper = ({id}) => {
  const dispatch = useAppDispatch()
  const handleDeleteClick = () => {
    dispatch(deleteCategory(id))
  }

  return (
    <>
      <span>
        <Tooltip title="Изменить">
          <Button type="default" shape="circle" icon={<EditOutlined />} />
        </Tooltip>
      </span>
      <span className={styles.deleteButtonSpan}>
        <Tooltip title="Удалить">
          <Button 
            type="default" 
            shape="circle" 
            icon={<DeleteOutlined 
            onClick={handleDeleteClick}
          />} />
        </Tooltip>
      </span>
    </>
  )
}

export default ActionButtonsWrapper