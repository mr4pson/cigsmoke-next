import { getQueryParams } from 'common/helpers/manageQueryParams.helper';
import { Dispatch, SetStateAction } from 'react';
import {
  fetchBrands,
  fetchColors,
  fetchPriceRange,
  fetchProducts,
  fetchSubCategories,
} from 'redux/slicers/store/catalogSlicer';
import { AppDispatch } from 'redux/store';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { TFiltersConfig } from './types';

const convertQueryParams = (query: {
  [k: string]: string | string[] | undefined;
}) => {
  const { categories, subCategories, brands, colors } = query;
  const categoriesArray = categories
    ? Array.isArray(categories)
      ? categories
      : [categories]
    : undefined;
  const subCategoriesArray = subCategories
    ? Array.isArray(subCategories)
      ? subCategories
      : [subCategories]
    : undefined;
  const brandsArray = brands
    ? Array.isArray(brands)
      ? brands
      : [brands]
    : undefined;
  const colorsArray = colors
    ? Array.isArray(colors)
      ? colors
      : [colors]
    : undefined;

  return {
    categories: categoriesArray,
    subCategories: subCategoriesArray,
    brands: brandsArray,
    colors: colorsArray,
  };
};

const getFiltersConfig = ({
  categories,
  subCategories,
  brands,
  colors,
  priceRange,
  filters,
}: TFiltersConfig) => {
  return {
    sectionOptions: categories.map(({ id, name, url }) => ({
      id,
      name,
      url,
      checked: !!filters.categories?.find((categoryUrl) => categoryUrl === url),
    })) as FilterOption[],
    subSectionOptions: subCategories.map(({ id, name, url }) => ({
      id,
      name,
      url,
      checked: !!filters.subCategories?.find(
        (categoryUrl) => categoryUrl === url,
      ),
    })) as FilterOption[],
    brandOptions: brands.map(({ id, name, url }) => ({
      id,
      name,
      url,
      checked: !!filters.brands?.find((brandUrl) => brandUrl === url),
    })) as FilterOption[],
    colorOptions: colors.map(({ id, name, url, code }) => ({
      id,
      name,
      url,
      color: code,
      checked: !!filters.colors?.find((colorUrl) => colorUrl === url),
    })) as FilterOption[],
    minPrice: priceRange.minPrice!,
    maxPrice: priceRange.maxPrice!,
  };
};

const setPriceRange = (dispatch: AppDispatch) => {
  const queryParams = getQueryParams(window.location.search);
  const { categories, subCategories } = convertQueryParams(queryParams);
  const payload = {
    parent: categories ? categories[0] : undefined,
    categories: subCategories,
  };

  dispatch(fetchPriceRange(payload));
};

const onLocationChange =
  (
    curLocation: string,
    dispatch: AppDispatch,
    setCurLocation: Dispatch<SetStateAction<string>>,
  ) =>
  async () => {
    const queryParams = getQueryParams(window.location.search);
    const { minPrice, maxPrice, name } = queryParams;
    const { categories, subCategories, brands, colors } =
      convertQueryParams(queryParams);
    const payload = {
      brands,
      colors,
      name,
      parent: categories ? categories[0] : undefined,
      categories: subCategories,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    dispatch(fetchProducts(payload));
    setCurLocation(window.location.search);

    const rawPrevQueryParams = getQueryParams(curLocation);
    const prevQueryParams = convertQueryParams(rawPrevQueryParams);

    if (
      JSON.stringify(prevQueryParams.categories) !== JSON.stringify(categories)
    ) {
      await dispatch(fetchSubCategories(categories![0]));
      await dispatch(fetchBrands({ parent: categories![0] }));
      await dispatch(fetchColors({ parent: categories![0] }));
      setPriceRange(dispatch);
    }

    if (
      JSON.stringify(prevQueryParams.subCategories) !==
      JSON.stringify(subCategories)
    ) {
      if (subCategories) {
        await dispatch(fetchBrands({ category: subCategories[0] }));
        await dispatch(fetchColors({ category: subCategories[0] }));
      }
    }
  };

export {
  convertQueryParams,
  getFiltersConfig,
  setPriceRange,
  onLocationChange,
};
