import { pushQueryParams } from 'common/helpers/manageQueryParams.helper';
import cloneDeep from 'lodash/cloneDeep';
import Router from 'next/router';
import { FilterOption } from 'ui-kit/FilterCheckbox/types';
import { Filter } from './types';

enum FilterType {
  MULTIPLE_SELECTION,
  SINGLE_SELECTION,
  RANGE,
  COLOR,
}

const getFilters = ({
  sectionOptions,
  brandOptions,
  colorOptions,
  minPrice,
  maxPrice,
}: {
  sectionOptions: FilterOption[];
  brandOptions: FilterOption[];
  colorOptions: FilterOption[];
  minPrice: number;
  maxPrice: number;
}): Filter[] => {
  return [
    {
      title: 'Раздел',
      options: cloneDeep(sectionOptions),
      type: FilterType.SINGLE_SELECTION,
      onChange: (selectedOption: FilterOption | undefined) => {
        const categories = [selectedOption?.url!];

        pushQueryParams('categories', categories);
      },
    },
    {
      title: 'Бренды',
      options: cloneDeep(brandOptions),
      type: FilterType.MULTIPLE_SELECTION,
      onChange: (selectedOptions: FilterOption[] | undefined) => {
        const brands = selectedOptions?.map(option => option.url);

        pushQueryParams('brands', brands);
      },
    },
    {
      title: 'Цвет',
      options: cloneDeep(colorOptions),
      type: FilterType.COLOR,
      onChange: (selectedOptions: FilterOption[] | undefined) => {
        const colors = selectedOptions?.map(option => option.url);

        pushQueryParams('colors', colors);
      },
    },
    {
      title: 'Цена',
      type: FilterType.RANGE,
      min: minPrice,
      max: maxPrice,
      onChange: ([minPrice, maxPrice]: [number, number]) => {
        pushQueryParams('minPrice', minPrice);
        pushQueryParams('maxPrice', maxPrice);
      },
    },
  ];
};

export { FilterType, getFilters };

