import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchProducts,
  clearProducts,
} from '../../../redux/slicers/productsSlicer';
import { useEffect } from 'react';
import styles from './index.module.scss';
import { Spin, Table } from 'antd';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Page } from 'routes/constants';
import { navigateTo } from 'common/helpers';
import AdminLayout from 'components/admin/adminLayout/layout';
import { DataType } from 'common/interfaces/data-type.interface';
import { columns } from 'components/admin/products/constants';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { handleTableChange } from 'components/admin/products/helpers';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const isLoading = useAppSelector((state) => state.products.loading);
  const router = useRouter();

  const dataSource = products?.map(
    ({
      id,
      name,
      price,
      desc,
      available,
      colors,
      category,
      images,
      brand,
      tags,
      url,
      ...rest
    }) => ({
      key: id,
      id,
      name,
      price,
      desc,
      available,
      colors,
      category,
      images: (images as string)?.split(','),
      brand,
      tags,
      url,
    }),
  ) as unknown as DataType[];

  useEffect(() => {
    dispatch(fetchProducts());

    return () => {
      dispatch(clearProducts());
    };
  }, []);

  return (
    <>
      <div className={styles.productsHeader}>
        <h1 className={styles.productsHeader__title}>Продукты</h1>
        <Button
          className={styles.productsHeader__createProductButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_PRODUCT)}
        >
          Создать новый продукт
        </Button>
      </div>
      {isLoading ? (
        <Spin className="spinner" size="large" />
      ) : (
        <Table
          columns={
            columns as (ColumnGroupType<DataType> | ColumnType<DataType>)[]
          }
          dataSource={dataSource}
          onChange={handleTableChange}
        />
      )}
    </>
  );
};

ProductsPage.PageLayout = AdminLayout;

export default ProductsPage;
