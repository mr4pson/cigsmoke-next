import { Carousel, Image } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Color, Product, Tag } from 'swagger/services';
import { handleRedirectBrands } from '../brands/helpers';
import { handleRedirectCategory } from '../categories/helpers';

import ActionButtons from '../generalComponents/ActionButtons';
import { handleRedirectTags } from '../tags/helpers';
import { handleDeleteProduct, handleRedirectProducts } from './helpers';
import styles from './products.module.scss';
import TableLink from './TableLink';

export const columns: ColumnsType<Product> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '5%',
  },
  {
    title: 'Изображения',
    dataIndex: 'images',
    render: (_, record?) => {
      if (record?.images) {
        return (
          <div
            style={{
              width: '120px',
              height: '120px',
            }}
          >
            <Carousel effect="fade">
              {(record.images as unknown as string[]).map((image) => {
                if (image) {
                  return (
                    <div>
                      <Image
                        className={styles.productsTable__contentStyle}
                        src={`/api/images/${image.trim()}`}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = '/assets/images/img_error.png';
                        }}
                      />
                    </div>
                  );
                }
                return (
                  <img
                    src={'/assets/images/no_photo.png'}
                    className={styles.image}
                  />
                );
              })}
            </Carousel>
          </div>
        );
      }
    },
    width: '10%',
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    width: '10%',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    width: '5%',
  },
  {
    title: 'Описание',
    dataIndex: 'desc',
    width: '15%',
  },
  {
    title: 'Доступно',
    dataIndex: 'available',
    filters: [
      {
        text: 'Да',
        value: 'Да',
      },
      {
        text: 'Нет',
        value: 'Нет',
      },
    ],
    onFilter: (value: string | number | boolean, record) =>
      new String(record?.available!).startsWith(value.toString()),
    filterSearch: true,
    width: '7.5%',
  },
  {
    title: 'Цвета',
    dataIndex: 'colors',
    render: (_, record) => {
      return (
        <ul>
          {(record?.colors as Color[]).map((color) => (
            <div
              style={{
                minWidth: '70px',
              }}
            >
              <div
                className={styles.productsTable__colorBoxStyle}
                style={{ backgroundColor: color.code }}
              ></div>
            </div>
          ))}
        </ul>
      );
    },
    width: '7.5%',
  },
  {
    title: 'Категория',
    render: (_, record) => {
      return (
        <TableLink
          id={record.category!.id as string}
          name={record.category!.name as string}
          handleRedirect={handleRedirectCategory}
        />
      );
    },
    width: '7.5%',
  },
  {
    title: 'Бренд',
    render: (_, record) => {
      return (
        <TableLink
          id={record.brand!.id as string}
          name={record.brand!.name as string}
          handleRedirect={handleRedirectBrands}
        />
      );
    },
    width: '7.5%',
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
              <TableLink
                id={tag!.id as string}
                name={tag!.name as string}
                handleRedirect={handleRedirectTags}
              />
            </li>
          ))}
        </ul>
      );
    },
    width: '7.5%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteProduct}
          handleRedirect={handleRedirectProducts}
          option={'products'}
          title="продукт"
        />
      );
    },
    width: '10%',
  },
];
