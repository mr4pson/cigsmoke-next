import { ColumnsType } from 'antd/lib/table';
import ActionButtons from '../generalComponents/ActionButtons';
import { CheckoutsData } from './CheckoutsData.interface';
import { handleDeleteCheckout } from './helpers';

const columns: ColumnsType<CheckoutsData> = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Адрес',
    dataIndex: 'addressName',
  },
  {
    title: 'Информация об оплате',
    dataIndex: 'payment',
  },
  {
    title: 'Заказанные продукты',
    dataIndex: 'orderedProducts',
    render: (_, record) => (
      <div key={record.orderedProducts.id}>
        ID продукта: {record.orderedProducts.productId}, {'\n'}
        количество: {record.orderedProducts.qty}, {'\n'}
        стоимость: {record.orderedProducts.productPrice}
      </div>
    ),
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
