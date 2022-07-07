import ManageCategoryForm from 'components/categories/ManageCategoryForm';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchCategories } from '../../../../redux/slicers/categoriesSlicer';

const ManageCategory = () => {
  const title = 'Создание категории';
  const categories = useAppSelector((state) => state.categories.categories);
  const isLoading = useAppSelector((state) => state.categories.loading);
  const isSaveLoading = useAppSelector((state) => state.categories.saveLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <ManageCategoryForm
      title={title}
      editMode={false}
      categories={categories}
      isLoading={isLoading}
      isSaveLoading={isSaveLoading}
    />
  );
};

export default ManageCategory;
