import { ColumnsType } from 'antd/lib/table';
import ActionButtonsWrapper from './ActionButtonsWrapper';
import { Color, Product, Tag } from 'swagger/services';

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
      compare: (a, b) => (a.price as number) - (b.price as number),
    },
  },
  {
    title: 'Описание',
    dataIndex: 'desc',
  },
  {
    title: 'Доступно',
    dataIndex: 'available',
    render: (_, record) => {
      return <div>{record.available?.toString()}</div>;
    },
  },
  {
    title: 'Цвета',
    dataIndex: 'colors',
    render: (_, record) => {
      return (
        <ul>
          {(record?.colors as Color[]).map((color) => (
            <li key={color.id}>
              Имя: {color.name}, id: {color.code}
            </li>
          ))}
        </ul>
      );
    },
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
    render: (_, record?) => {
      if (record?.images) {
        return (
          <ul>
            {record?.images.map((image) => (
              <li key={image}>{image}</li>
            ))}
          </ul>
        );
      }
    },
  },
  {
    title: 'Бренд',
    dataIndex: 'brand',
  },
  {
    title: 'URL',
    dataIndex: 'url',
  },
  {
    title: 'Теги',
    dataIndex: 'tags',
    render: (_, record) => {
      return (
        <ul>
          {(record?.tags as Tag[]).map((tag) => (
            <li key={tag.id}>
              Имя: {tag.name}, id: {tag.id}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return <ActionButtonsWrapper id={record.id as string} />;
    },
  },
];
