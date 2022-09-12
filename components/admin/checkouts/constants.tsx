import { ColumnsType } from 'antd/lib/table';
import ActionButtons from '../generalComponents/ActionButtons';
import { CheckoutsData } from './CheckoutsData.interface';
<<<<<<< HEAD
import { handleDeleteCheckout, handleRedirectCheckout  } from './helpers';
=======
import { handleDeleteCheckout, handleRedirectCheckout } from './helpers';
>>>>>>> a3b870ac267315925a1e7a45966114e5a6529ddf

interface CheckoutsTableData {
  id: string;
  user: { firstName: string; email: string };
  basket: { id: string };
  address: { city: string; address: string };
}

const columns: ColumnsType<CheckoutsTableData> = [
  {
    title: 'Заказ №',
    dataIndex: 'id',
    width: '10%',
  },
  {
    title: 'Пользователь',
    dataIndex: 'user',
    render: (_, record) => {
      return (
        <p>
          {record.user?.firstName}, {record.user.email}
        </p>
      );
    },
    width: '25%',
  },
  {
    title: 'Корзина',
    dataIndex: 'basket',
    render: (_, record) => {
      return <p>Id: {record.basket.id}</p>;
    },
    width: '10%',
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
    width: '20%',
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    width: '25%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteCheckout}
<<<<<<< HEAD
	  handleRedirect={handleRedirectCheckout}
=======
          handleRedirect={handleRedirectCheckout}
>>>>>>> a3b870ac267315925a1e7a45966114e5a6529ddf
          option={'checkouts'}
          title="заказ"
        />
      );
    },
    width: '10%',
  },
];

export { columns };
