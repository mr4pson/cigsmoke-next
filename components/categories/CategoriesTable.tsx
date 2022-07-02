import { Table } from 'antd';
import { columns } from './constants';
import { handleTableChange } from './helpers';
import { TCategory } from '../../common/interfaces/types';
import { DataType } from 'common/interfaces/data-type.interface';

type Props = {
  categories: TCategory[];
};

const CategoriesTable: React.FC<Props> = ({ categories }) => {
  const dataSource = categories?.map(
    ({ id, name, createdAt, updatedAt, url, parent, ...rest }) => ({
      key: id,
      id,
      name,
      createdAt,
      updatedAt,
      url,
      parent,
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

export default CategoriesTable;
