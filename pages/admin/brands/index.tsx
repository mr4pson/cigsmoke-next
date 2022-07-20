import { Button, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { navigateTo } from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/brands/constants';
import { handleTableChange } from 'components/admin/brands/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearBrands, fetchBrands } from 'redux/slicers/brandsSlicer';
import { Page } from 'routes/constants';

import styles from './index.module.scss';

const Brands = () => {
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.brands.brands);
  const isLoading = useAppSelector((state) => state.brands.loading);
  const router = useRouter();

  const dataSource = brands?.map(({ id, name, image, ...rest }) => ({
    key: id,
    id,
    name,
    image,
  })) as unknown as DataType[];

  useEffect(() => {
    dispatch(fetchBrands());

    return () => {
      dispatch(clearBrands());
    };
  }, []);

  return (
    <>
      <div className={styles.brandsHeader}>
        <h1 className={styles.brandsHeader__title}>Бренды</h1>
        <Button
          className={styles.brandsHeader__createBrandButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_BRAND)}
        >
          Создать новый бренд
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

Brands.PageLayout = AdminLayout;

export default Brands;
