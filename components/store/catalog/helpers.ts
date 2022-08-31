import { getQueryParams } from 'common/helpers/manageQueryParams.helper';
import {
  clearBrands,
  clearColors,
  clearSubCategories,
  fetchBrands,
  fetchColors,
  fetchPriceRange,
  fetchProducts,
  fetchSubCategories,
  setPage,
} from 'redux/slicers/store/catalogSlicer';
import { AppDispatch } from 'redux/store';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { TFiltersConfig } from './types';

const PAGE_ITEMS_LIMIT = 12;

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

const onLocationChange = (dispatch: AppDispatch) => async () => {
  const queryParams = getQueryParams(window.location.search);
  const { minPrice, maxPrice, name, page } = queryParams;
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
    limit: PAGE_ITEMS_LIMIT,
    offset: PAGE_ITEMS_LIMIT * (Number(page ?? 1) - 1),
  };

  dispatch(setPage(Number(page ?? 1)));

  dispatch(fetchProducts(payload));
  const curLocation = localStorage.getItem('location')!;
  localStorage.setItem('location', window.location.search);

  const rawPrevQueryParams = getQueryParams(curLocation);
  const prevQueryParams = convertQueryParams(rawPrevQueryParams);

  if (
    JSON.stringify(prevQueryParams.categories) !== JSON.stringify(categories)
  ) {
    const category = categories ? categories[0] : '';

    if (category) {
      await dispatch(fetchSubCategories(category));
      await dispatch(fetchBrands({ parent: category }));
      await dispatch(fetchColors({ parent: category }));
    } else {
      await dispatch(clearSubCategories());
      await dispatch(clearBrands());
      await dispatch(clearColors());
    }
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
