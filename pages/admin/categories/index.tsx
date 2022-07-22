import { Button, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { navigateTo } from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/categories/constants';
import { handleTableChange } from 'components/admin/categories/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Page } from 'routes/constants';

import {
  clearCategories,
  fetchCategories,
} from '../../../redux/slicers/categoriesSlicer';
import styles from './index.module.scss';

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const isLoading = useAppSelector((state) => state.categories.loading);
  const router = useRouter();

  const dataSource = categories?.map(
    ({ id, name, createdAt, updatedAt, url, parent, ...rest }) => ({
      key: id,
      id,
      name,
      createdAt,
      updatedAt,
      url,
      parent,
    }),
  ) as unknown as DataType[];

  useEffect(() => {
    dispatch(fetchCategories());

    return () => {
      dispatch(clearCategories());
    };
  }, []);

  return (
    <>
      <div className={styles.categoriesHeader}>
        <h1 className={styles.categoriesHeader__title}>Категории</h1>
        <Button
          className={styles.categoriesHeader__createCategoryButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_CATEGORY)}
        >
          Создать новую категорию
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

CategoriesPage.PageLayout = AdminLayout;

export default CategoriesPage;
