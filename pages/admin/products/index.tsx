import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchProducts,
  clearProducts,
} from '../../../redux/slicers/productsSlicer';
import { useEffect } from 'react';
import ProductsTable from '../../../components/admin/products/ProductsTable';
import styles from './index.module.scss';
import { Spin } from 'antd';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Page } from 'routes/constants';
import { navigateTo } from 'common/helpers';
import AdminLayout from 'components/admin/adminLayout/layout';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const isLoading = useAppSelector((state) => state.products.loading);
  const router = useRouter();

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
        <ProductsTable products={products} />
      )}
    </>
  );
};

ProductsPage.PageLayout = AdminLayout;

export default ProductsPage;
