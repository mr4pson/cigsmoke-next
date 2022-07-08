import ManageBrandForm from 'components/brands/ManageBrandsForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearBrands,
  fetchBrands,
  fetchChosenBrand,
  clearChosenBrand,
} from '../../redux/slicers/brandsSlicer';

const ManageBrand = () => {
  const title = 'Редактирование бренда';
  const router = useRouter();
  const brands = useAppSelector((state) => state.brands.brands);
  const filteredBrands = brands.filter(
    (brand) => brand.id !== Number(router.query.id),
  );
  const brand = useAppSelector((state) => state.brands.chosenBrand);
  const isLoading = useAppSelector((state) => state.brands.loading);
  const isSaveLoading = useAppSelector((state) => state.brands.saveLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBrands());

    return () => {
      dispatch(clearBrands());
    };
  }, [dispatch]);

  useEffect(() => {
    if (router.query.id) {
      dispatch(fetchChosenBrand(router.query.id as string));
    }
    
    return () => {
      dispatch(clearChosenBrand())
    }
  }, [dispatch, router.query]);

  return (
    <ManageBrandForm
      title={title}
      editMode={true}
      brands={filteredBrands}
      brand={brand}
      isLoading={isLoading}
      isSaveLoading={isSaveLoading}
    />
  );
};

export default ManageBrand;
