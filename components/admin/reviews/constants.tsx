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
  },
  {
    title: 'Рейтинг',
    dataIndex: 'rating',
    sorter: {
      compare: (a, b) => (a?.rating as number) - (b?.rating as number),
    },
  },
  {
    title: 'Комментарий',
    dataIndex: 'text',
  },
  {
    title: 'Продукт',
    dataIndex: 'product',
    sorter: {
      compare: (a, b) => a?.product!.localeCompare(b?.product!),
    },
  },
  {
    title: 'Почта пользователя',
    dataIndex: 'email',
    sorter: {
      compare: (a, b) => a?.email!.localeCompare(b?.email!),
    },
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
  },
];

export { columns };
