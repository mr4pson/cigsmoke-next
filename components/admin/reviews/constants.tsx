import { ColumnsType } from 'antd/lib/table';
import { Review } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteReview } from './helpers';

interface ReviewsData {
  id: string;
  rating: number;
  text: string;
  product: string;
  email: string;
}

const columns: ColumnsType<ReviewsData> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '10%',
  },
  {
    title: 'Рейтинг',
    dataIndex: 'rating',
    width: '10%',
  },
  {
    title: 'Комментарий',
    dataIndex: 'text',
    width: '30%',
  },
  {
    title: 'Продукт',
    dataIndex: 'product',
    width: '25%',
  },
  {
    title: 'Почта пользователя',
    dataIndex: 'email',
    width: '15%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteReview}
          option={'reviews'}
          title="комментарий"
        />
      );
    },
    width: '10%',
  },
];

export { columns };
