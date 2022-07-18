import AdminLayout from 'components/admin/adminLayout/layout';
import ManageProductForm from 'components/admin/products/ManageProductsForm';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearBrands, fetchBrands } from 'redux/slicers/brandsSlicer';
import {
  clearCategories,
  fetchCategories,
} from 'redux/slicers/categoriesSlicer';
import { clearColors, fetchColors } from 'redux/slicers/colorsSlicer';
import { clearImageList } from 'redux/slicers/imagesSlicer';
import { clearTags, fetchTags } from 'redux/slicers/tagsSlicer';
import { fetchProducts } from '../../../../redux/slicers/productsSlicer';

const CreateProduct = () => {
  const title = 'Создание продукта';
  const products = useAppSelector((state) => state.products.products);
  const isLoading = useAppSelector((state) => state.products.loading);
  const isSaveLoading = useAppSelector((state) => state.products.saveLoading);
  const dispatch = useAppDispatch();

  const colors = useAppSelector((state) => state.colors.colors);
  const categories = useAppSelector((state) => state.categories.categories);
  const brands = useAppSelector((state) => state.brands.brands);
  const tags = useAppSelector((state) => state.tags.tags);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchColors());
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchTags());

    return () => {
      dispatch(clearColors());
      dispatch(clearCategories());
      dispatch(clearBrands());
      dispatch(clearTags());
      dispatch(clearImageList());
    };
  }, [dispatch]);

  return (
    <ManageProductForm
      tags={tags}
      brands={brands}
      categories={categories}
      colors={colors}
      title={title}
      editMode={false}
      products={products}
      isLoading={isLoading}
      isSaveLoading={isSaveLoading}
    />
  );
};

CreateProduct.PageLayout = AdminLayout;

export default CreateProduct;
