import { Table } from 'antd';
import { columns } from './constants';
import { handleTableChange } from './helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import { Tag } from 'swagger/services';

type Props = {
  tags: Tag[];
};

const TagsTable: React.FC<Props> = ({ tags }) => {
  const dataSource = tags?.map(({ id, name, url }) => ({
    key: id,
    id,
    name,
    url,
  })) as unknown as DataType[];

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

export default TagsTable;
