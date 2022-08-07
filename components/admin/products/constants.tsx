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
  },
  {
    title: 'Категория',
    sorter: {
      compare: (a, b) => a.name!.localeCompare(b.name!),
    },
    render: (_, record) => {
      return (
        <TableLink
          id={record.category!.id as string}
          name={record.category!.name as string}
          handleRedirect={handleRedirectCategory}
        />
      );
    },
  },
  {
    title: 'Бренд',
    sorter: {
      compare: (a, b) => a.name!.localeCompare(b.name!),
    },
    render: (_, record) => {
      return (
        <TableLink
          id={record.brand!.id as string}
          name={record.brand!.name as string}
          handleRedirect={handleRedirectBrands}
        />
      );
    },
  },
  {
    title: 'URL',
    dataIndex: 'url',
    sorter: {
      compare: (a, b) => a.name!.localeCompare(b.name!),
    },
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
  },
];
