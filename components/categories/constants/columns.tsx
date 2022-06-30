import { ColumnsType, TableProps } from 'antd/lib/table';
import { Category } from '../../../common/interfaces/types';
import ActionButtonsWrapper from '../ActionButtonsWrapper';

const columns: ColumnsType<Category> = [
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
    title: 'Дата создания',
    dataIndex: 'createdAt',
    sorter: {
      compare: (a, b) => a.createdAt!.localeCompare(b.createdAt!),
    },
  },
  {
    title: 'Дата изменения',
    dataIndex: 'updatedAt',
    sorter: {
      compare: (a, b) => a.updatedAt!.localeCompare(b.updatedAt!),
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
    title: 'Родитель',
    dataIndex: 'parent',
    render: (parent) => <div>{parent?.name}</div>,
  },
  {
    title: 'Опции',
    render: (_, record) => <ActionButtonsWrapper id={record.id} />,
  },
];

export { columns };
