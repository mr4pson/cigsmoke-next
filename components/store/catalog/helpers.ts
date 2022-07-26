import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { TFiltersConfig } from './types';

export const convertQueryParams = (query) => {
  const { categories, brands, colors } = query;
  const categoriesArray = categories
    ? Array.isArray(categories)
      ? categories
      : [categories]
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
    brands: brandsArray,
    colors: colorsArray,
  };
};

export const getFiltersConfig = ({
  categories,
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
