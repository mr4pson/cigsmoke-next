import { ColumnsType } from 'antd/lib/table';
import { Color } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteColor, handleRedirectColors } from './helpers';

export const columns: ColumnsType<Color> = [
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
    title: 'Url',
    dataIndex: 'url',
    sorter: {
      compare: (a, b) => a.url!.localeCompare(b.url!),
    },
  },
  {
    title: 'Код',
    dataIndex: 'code',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteColor}
          handleRedirect={handleRedirectColors}
          option={'colors'}
          title="цвет"
        />
      );
    },
  },
];
