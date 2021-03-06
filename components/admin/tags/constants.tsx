import { ColumnsType } from 'antd/lib/table';
import { Tag } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteTag, handleRedirectTags } from './helpers';

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
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteTag}
          handleRedirect={handleRedirectTags}
          option={'tags'}
          title="тег"
        />
      );
    },
  },
];

export { columns };
