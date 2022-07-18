import { ColumnsType } from 'antd/lib/table';
import ActionButtonsWrapper from './ActionButtonsWrapper';
import { Parameter } from 'swagger/services';


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
      const chosenstate = 'categories'

      return <ActionButtonsWrapper id={record.id} />
    },
  },
];