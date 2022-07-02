import { CheckOutlined } from '@ant-design/icons';
import { notification } from 'antd';

export const openSuccessNotification = () => {
  const args = {
    message: "Запрос завершен успешно.",
    duration: 5,
    icon: <CheckOutlined className='success-icon'/>,
  };
  notification.open(args);
}
