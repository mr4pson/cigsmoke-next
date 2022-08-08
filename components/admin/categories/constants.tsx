import { ColumnsType } from 'antd/lib/table';
import { Category } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteCategory, handleRedirectCategory } from './helpers';
import styles from './categories.module.scss';
import { Image } from 'antd';

const columns: ColumnsType<Category> = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Изображение',
    dataIndex: 'image',
    render: (_, record) => {
      return (
        <Image
          src={`/api/images/${record?.image}`}
          className={styles.image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/assets/images/img_error.png';
          }}
        />
      );
    },
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
    sorter: {
      compare: (a, b) => a.name!.localeCompare(b.name!),
    },
    render: (parent) => <div>{parent?.name}</div>,
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteCategory}
          handleRedirect={handleRedirectCategory}
          option={'categories'}
          title="категорию"
        />
      );
    },
  },
];

export { columns };
