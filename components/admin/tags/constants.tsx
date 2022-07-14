import { ColumnsType } from 'antd/lib/table';
import { Tag } from 'swagger/services';
import ActionButtonsWrapper from './ActionButtonsWrapper';

const columns: ColumnsType<Tag> = [
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
    title: 'Действия',
    render: (_, record) => <ActionButtonsWrapper id={record.id as string} />,
  },
];

export { columns };
