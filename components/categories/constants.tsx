import { ColumnsType, TableProps } from 'antd/lib/table';
import { DataType } from 'common/interfaces/data-type.interface';

const columns: ColumnsType<DataType> = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    sorter: {
      compare: (a: any, b: any) => a > b ? 1 : a < b ? -1 : 0,
      multiple: 3,
    },
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Дата изменения',
    dataIndex: 'updatedAt',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Url',
    dataIndex: 'url',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'Родитель',
    dataIndex: 'parent',
    render: (parent) => <div>{parent?.name}</div>
  },
];

export { columns }