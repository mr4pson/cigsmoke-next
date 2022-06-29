import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { ExclamationOutlined } from '@ant-design/icons';
import styles from "./create-category/createCategory.module.scss"
import { notification } from 'antd';
import { disableError } from '../../redux/slicers/categoriesSlicer'

export const useErrorNotidication = () => {
  const postError = useAppSelector(state => state.categories.error)
  const dispatch = useAppDispatch()
  
  const errorEffect = () => {
    useEffect(() => {
      console.log(postError)
      postError && openNotification()
    }, [postError])
  }
  
  const openNotification = () => {
    const args = {
      message: 'Ошибка сервера',
      description: postError,
      duration: 5,
      icon: <ExclamationOutlined className={styles.exclamationIcon}/>,
      onClose: () => {
        console.log('Closed')
        dispatch(disableError())
      }
    };
    notification.open(args);
  }
  
  return errorEffect
}



