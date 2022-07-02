import ManageCategoryForm from 'components/categories/ManageCategoryForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearCategory,
  fetchCategories,
  fetchCategory,
} from '../../redux/slicers/categoriesSlicer';

const ManageCategory = () => {
  const title = 'Редактирование категории';
  const router = useRouter();
  const categories = useAppSelector((state) => state.categories.categories);
  const filteredCategories = categories.filter(
    (category) => category.id !== Number(router.query.id),
  );
  const category = useAppSelector((state) => state.categories.category);
  const isLoading = useAppSelector((state) => state.categories.loading);
  const isSaveLoading = useAppSelector((state) => state.categories.saveLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());

    return () => {
      dispatch(clearCategory());
    };
  }, [dispatch]);

  useEffect(() => {
    if (router.query.id) {
      dispatch(fetchCategory(router.query.id as string));
    }
  }, [dispatch, router.query]);

  return (
    <ManageCategoryForm
      title={title}
      editMode={true}
      categories={filteredCategories}
      category={category}
      isLoading={isLoading}
      isSaveLoading={isSaveLoading}
    />
  );
};

export default ManageCategory;