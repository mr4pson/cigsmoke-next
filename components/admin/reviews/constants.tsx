import { ColumnsType } from 'antd/lib/table';
import { Review } from 'swagger/services';
import ActionButtonsWrapper from './ActionButtonsWrapper';

const columns: ColumnsType<Review> = [
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
    dataIndex: 'comment',
  },
  {
    title: 'ID продукта',
    dataIndex: 'productId',
    sorter: {
      compare: (a, b) => a?.productId!.localeCompare(b?.productId!),
    },
  },
  {
    title: 'ID пользователя',
    dataIndex: 'userId',
    sorter: {
      compare: (a, b) => a?.userId!.localeCompare(b?.userId!),
    },
  },
  {
    title: 'Действия',
    render: (_, record) => <ActionButtonsWrapper id={record.id} />,
  },
];

export { columns };
