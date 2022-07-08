import { ColumnsType } from 'antd/lib/table';
import ActionButtonsWrapper from './ActionButtonsWrapper';
import { Product } from 'swagger/services';


export const columns: ColumnsType<Product> = [
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
    title: 'Цена',
    dataIndex: 'price',
    sorter: {
      compare: (a, b) => a.price - b.price,
    },
  },
  {
    title: 'Описание',
    dataIndex: 'desc',
  },
  {
    title: 'Доступно',
    dataIndex: 'available',
    sorter: {
      compare: (a, b) => a.name!.localeCompare(b.name!),
    },
  },
  {
    title: 'Цвета',
    dataIndex: 'colors',
  },
  {
    title: 'Категория',
    dataIndex: 'category',
    sorter: {
      compare: (a, b) => a.name!.localeCompare(b.name!),
    },
  },
  {
    title: 'Изображения',
    dataIndex: 'images',
  },
    {
    title: 'Бренд',
    dataIndex: 'brand',
    sorter: {
      compare: (a, b) => a.brand!.localeCompare(b.brand!),
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