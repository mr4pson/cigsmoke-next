import { Table } from 'antd';
import { columns } from './constants';
// import { handleTableChange } from './helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import { Parameter } from 'swagger/services';
import { handleTableChange } from './helpers';

type Props = {
  parameters: Parameter[];
};

const ParametersTable: React.FC<Props> = ({ parameters }) => {
  const dataSource = parameters?.map(
    ({ id, name, ...rest }) => ({
      key: id,
      id,
      name,
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

export default ParametersTable;