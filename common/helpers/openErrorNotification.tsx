import { ExclamationOutlined } from '@ant-design/icons';
import { notification } from 'antd';

export const openErrorNotification = (error: string) => {
  const args = {
    message: error,
    duration: 5,
    icon: <ExclamationOutlined className="exclamation-icon" />,
  };
  notification.open(args);
};
