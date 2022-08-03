import { ColumnsType } from 'antd/lib/table';
import ActionButtons from '../generalComponents/ActionButtons';
import { CheckoutsData } from './CheckoutsData.interface';
import { handleDeleteCheckout } from './helpers';

interface CheckoutsTableData {
  id: string;
  user: { firstName: string; email: string };
  basket: { id: string };
  address: { city: string; address: string };
}

const columns: ColumnsType<CheckoutsTableData> = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Пользователь',
    dataIndex: 'user',
    sorter: {
      compare: (a, b) => a.user?.firstName!.localeCompare(b.user?.firstName!),
    },
    render: (_, record) => {
      return (
        <p>
          {record.user?.firstName}, {record.user?.email}
        </p>
      );
    },
  },
  {
    title: 'Корзина',
    dataIndex: 'basket',
    render: (_, record) => {
      return <p>Id: {record.basket.id}</p>;
    },
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    render: (_, record) => {
      return (
        <p>
          Город: {record.address.city}, улица: {record.address.address}
        </p>
      );
    },
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteCheckout}
          option={'checkouts'}
          title="заказ"
        />
      );
    },
  },
];

export { columns };
