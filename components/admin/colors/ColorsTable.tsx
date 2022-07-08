import { Table } from 'antd';
import { columns } from './constants';
// import { handleTableChange } from './helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import { Color } from 'swagger/services';
import { handleTableChange } from './helpers';

type Props = {
  colors: Color[];
};

const ColorsTable: React.FC<Props> = ({ colors }) => {
  const dataSource = colors?.map(
    ({ id, name, url, code, ...rest }) => ({
      key: id,
      id,
      name,
      url,
      code
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

export default ColorsTable;