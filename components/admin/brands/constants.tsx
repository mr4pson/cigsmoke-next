import { ColumnsType } from 'antd/lib/table';
import { Brand } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteBrand, handleRedirectBrands } from './helpers';

export const columns: ColumnsType<Brand> = [
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
    title: 'Изображение',
    dataIndex: 'image',
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
