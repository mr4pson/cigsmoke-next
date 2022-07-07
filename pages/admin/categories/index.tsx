import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { NextPage } from 'next/types';
import {
  fetchCategories,
  clearCategories,
} from '../../../redux/slicers/categoriesSlicer';
import { useEffect } from 'react';
import CategoriesTable from '../../../components/admin/categories/CategoriesTable';
import styles from './index.module.scss';
import { Spin } from 'antd';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Page } from 'routes/constants';
import { navigateTo } from 'common/helpers';
import AdminLayout from 'components/admin/adminLayout/layout';

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const isLoading = useAppSelector((state) => state.categories.loading);
  const router = useRouter();

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
        <CategoriesTable categories={categories} />
      )}
    </>
  );
};

CategoriesPage.PageLayout = AdminLayout;

export default CategoriesPage;
