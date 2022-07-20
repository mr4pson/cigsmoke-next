import { ColumnsType } from 'antd/lib/table';
import { Parameter } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteParameter, handleRedirectParameters } from './helpers';

export const columns: ColumnsType<Parameter> = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name!.localeCompare(b.name!),
    },
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteParameter}
          handleRedirect={handleRedirectParameters}
          option={'parameters'}
          title="параметр"
        />
      );
    },
  },
];
