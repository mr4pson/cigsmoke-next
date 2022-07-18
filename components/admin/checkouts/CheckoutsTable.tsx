import { Table } from 'antd';
import { columns } from './constants';
import { DataType } from 'common/interfaces/data-type.interface';
import { Checkout, OrderProduct } from 'swagger/services';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { CheckoutsData } from './CheckoutsData.interface';

type Props = {
  checkouts: Checkout[];
};

const CheckoutsTable: React.FC<Props> = ({ checkouts }) => {
  const dataSource = checkouts?.map(
    ({ id, address, payment, basket, ...rest }): CheckoutsData => ({
      key: id as string,
      id: id as string,
      addressName: `Город: ${address?.city},${'\n'}адрес: ${address?.address}`,
      payment: `ID пользователя: ${payment?.userId},${'\n'}номер карты: ${
        payment?.cardNumber
      }`,
      orderedProducts: basket?.orderProducts as OrderProduct,
    }),
  ) as unknown as DataType[];

  return (
    <>
      <Table
        columns={
          columns as (ColumnGroupType<DataType> | ColumnType<DataType>)[]
        }
        dataSource={dataSource}
      />
    </>
  );
};

export default CheckoutsTable;
