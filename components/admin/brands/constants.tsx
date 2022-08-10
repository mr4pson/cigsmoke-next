import { ColumnsType } from 'antd/lib/table';
import { Brand } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteBrand, handleRedirectBrands } from './helpers';
import styles from './brands.module.scss';
import { Image } from 'antd';

export const columns: ColumnsType<Brand> = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Изображение',
    render: (_, record) => {
      if (record.image) {
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
      }
      return (
        <img src={'/assets/images/no_photo.png'} className={styles.image} />
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
    title: 'URL',
    dataIndex: 'url',
  },
  {
    title: 'На главной странице',
    dataIndex: 'showOnMain',
    render: (_, record) => {
      console.log(record);
      return <span>{record.showOnMain ? 'Да' : 'Нет'}</span>;
    },
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteBrand}
          handleRedirect={handleRedirectBrands}
          option={'brands'}
          title="бренд"
        />
      );
    },
  },
];
