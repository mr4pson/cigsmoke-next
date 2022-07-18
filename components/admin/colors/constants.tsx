import { ColumnsType } from 'antd/lib/table';
import ActionButtonsWrapper from './ActionButtonsWrapper';
import { Color } from 'swagger/services';


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
      const chosenstate = 'categories'

      return <ActionButtonsWrapper id={record.id} />
    },
  },
];