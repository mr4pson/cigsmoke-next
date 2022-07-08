import { Table } from 'antd';
import { columns } from './constants';
// import { handleTableChange } from './helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import { Brand } from 'swagger/services';
import { handleTableChange } from './helpers';

type Props = {
  brands: Brand[];
};

const BrandsTable: React.FC<Props> = ({ brands }) => {
  const dataSource = brands?.map(
    ({ id, name, image, ...rest }) => ({
      key: id,
      id,
      name,
      image
    }),
  ) as unknown as DataType[];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={handleTableChange}
      />
    </>
  );
};

export default BrandsTable;