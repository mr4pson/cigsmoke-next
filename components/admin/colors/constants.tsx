import { ColumnsType } from 'antd/lib/table';
import { Color } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteColor, handleRedirectColors } from './helpers';

const colorBoxStyle = {
  width: '20px',
  height: '20px',
  border: 'solid 1px #dfdfdf',
  marginBottom: '2px',
  borderRadius: '2px',
};

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
    title: 'Цвет',
    render: (_, record) => {
      return (
        <div style={{ ...colorBoxStyle, backgroundColor: record.code }}></div>
      );
    },
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
