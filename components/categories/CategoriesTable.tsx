import { Table } from 'antd';
import { columns } from './constants';
import { handleTableChange } from './helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import { Category } from 'common/interfaces/category.interface';

type Props = {
  categories: Category[];
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
